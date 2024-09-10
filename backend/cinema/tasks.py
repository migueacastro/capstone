from datetime import datetime, timedelta
from .models import * 

def get_next_date_ahead(weekday):
    today = datetime.today()
    days_ahead = (weekday - today.weekday()) % 7
    return today + timedelta(days=days_ahead)

def createSessions():
    open_for_next_days = 5
    current_weekday = datetime.today().weekday()
    available_weekdays = []
    for i in range(open_for_next_days):
        weekday_id = (current_weekday + i) % 7 + 1
        available_weekdays.append(Weekday.objects.get(id=weekday_id))

    shifts = Shift.objects.filter(weekday__in=(available_weekdays), active=True)

    for shift in shifts:
        layout = Room.objects.get(id=shift.room.id).layout
        closest_date = get_next_date_ahead(shift.weekday.id)
        new_session, created = Session.objects.get_or_create(
            movie = shift.movie,
            room = shift.room,
            start_time = datetime.combine(closest_date, shift.start_time).isoformat(),
            end_time = datetime.combine(closest_date, shift.end_time).isoformat(),
            seats = layout
        )
        
        print("Created new session:", created)
        print("New session:", new_session)