import json
from .models import *
import datetime
from channels.generic.websocket import AsyncJsonWebsocketConsumer


class SessionConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['id']
        self.room_group_name = 'session_%s' % self.room_name
        self.group_instance = await SessionGroup.objects.aget_or_create(id=self.room_name)
        self.channel_instance, c = await SessionChannel.objects.aget_or_create(id=self.channel_name, group=self.group_instance)
        self.channel_instance.data = json.dumps({'seats': []})
        await self.channel_instance.asave()
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'session_message',
                'message': 'You are connected!',
            }
        )
        

    async def receive_json(self, content, **kwargs):
        print(f"Received JSON: {content}")
        await self.channel_layer.send(
            self.channel_name,
            {
                'type': content['type'],
                'data': content['data'],
            }
        )


    async def disconnect(self, close_code):
        channel_instance = await SessionChannel.objects.aget(id=self.channel_name)
        data = json.loads(channel_instance.data)
        if not close_code or close_code != 1000:
            for seat in data['seats']:
                await update_seat(self.room_name, seat, 'available')
                event = {'data': {'seat_pos': seat}}
                await self.seat_free_message(event)
            await channel_instance.adelete()

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )



    async def session_message(self, event):
        await self.send_json(
            {
                'type': 'session_message',
                'message': event['message'],
            }
        )
            
            
    async def seat_reservation_message(self, event):
        update_response = await update_seat(self.room_name, event['data']['seat_pos'], 'selected')
        await self.select_seat(event['data']['seat_pos'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'seat_reservation_update',
                'message': update_response['message'],
                'data': {'seats': update_response['seats'], 'session_id': self.room_name},
            }
        )

    

    async def seat_free_message(self, event):
        update_response = await update_seat(self.room_name, event['data']['seat_pos'], 'available')
        await self.release_seat(event['data']['seat_pos'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'seat_reservation_update',
                'message': update_response['message'],
                'data': {'seats': update_response['seats'], 'session_id': self.room_name},
            }
        )


    async def seat_purchase_message(self, event):
        update_response = await update_seat(self.room_name, event['data']['seat_pos'], 'unavailable')
        await self.release_seat(event['data']['seat_pos'])
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'seat_reservation_update',
                'message': update_response['message'],
                'data': {'seats': update_response['seats'], 'session_id': self.room_name},
            }
        )

    async def seat_reservation_update(self, event):
        await self.send_json(
            {
            'type': 'seat_reservation_update',
            'message': event['message'],
            'data': event['data'],}
        )

    async def select_seat(self, seat_pos):
        channel_instance = await SessionChannel.objects.aget(id=self.channel_name)
        
        try:
            data = json.loads(channel_instance.data)
        except TypeError:
            data = {'seats': []}

        if seat_pos not in data['seats']:   
            data['seats'].append(seat_pos)
        channel_instance.data = json.dumps(data)
        await channel_instance.asave()


    async def release_seat(self, seat_pos):
        channel_instance = await SessionChannel.objects.aget(id=self.channel_name)
        data = json.loads(channel_instance.data)
        if seat_pos in data['seats']:
            data['seats'].remove(seat_pos) 
        channel_instance.data = json.dumps(data)
        await channel_instance.asave()


async def update_seat(session_id, seat_pos_yx, status): 
    session_instance = await Session.objects.aget(id=session_id)
    seat_pos_x = seat_pos_yx[1]
    seat_pos_y = seat_pos_yx[0]
    session_instance.seats[seat_pos_y][seat_pos_x]['status'] = status
    await session_instance.asave()

    message = f"Seat at position {seat_pos_x}, {seat_pos_y} is now {status}! "
    
    return {
        'message': message,
        'seats': session_instance.seats
    }