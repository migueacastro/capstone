from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import *
from rest_framework.authtoken.models import Token
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from .helpers import *
from django.urls import reverse

class UserRegistrationSerializer(serializers.ModelSerializer):
    # Prepare the type of field for passwords in order to validate them
    password = serializers.CharField(write_only=True, style={'input_type': 'password'}, min_length=8, max_length=100)
    confirmPassword = serializers.CharField(write_only=True, style={'input_type': 'password'}, min_length=8, max_length=100)
    class Meta:
        model = get_user_model()
        # Fields that will be received
        fields = ['email', 'name', 'password', 'confirmPassword']

    def create(self, validated_data):
        # Create the user
        user_password = validated_data.get('password', None)
        user_instance = self.Meta.model(email = validated_data.get('email'), name = validated_data.get('name'))
        user_instance.set_password(user_password)
        user_instance.save()
        return user_instance
    

class UserLoginSerializer(serializers.ModelSerializer):
    # Prepare the type of field for passwords in order to validate them
    password = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    email = serializers.CharField(max_length=100, write_only=True)
    token = serializers.CharField(max_length=255, read_only=True)


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    confirmPassword = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = get_user_model()
        fields = ['id', 'name', 'email', 'is_staff', 'is_superuser', 'password', 'confirmPassword']

    def create(self, validated_data):
        # Create the user
        user_password = validated_data.get('password', None)
        user_instance = self.Meta.model(email = validated_data.get('email'), name = validated_data.get('name'))
        user_instance.set_password(user_password)
        user_instance.is_staff = validated_data.get('is_staff', False)
        user_instance.is_superuser = validated_data.get('is_superuser', False)
        user_instance.save()

        return user_instance
    
    def update(self, user_instance, validated_data):
        user_password = validated_data.get('password', None)
        user_instance.set_password(user_password)
        user_instance.email = validated_data.get('email', user_instance.email)
        user_instance.name = validated_data.get('name', user_instance.name)
        user_instance.is_staff = validated_data.get('is_staff', user_instance.is_staff)
        user_instance.is_superuser = validated_data.get('is_superuser', user_instance.is_superuser)
        user_instance.save()
        return user_instance


class ResetPasswordEmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

    class Meta:
        fields = ['email']


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=100, style={'input_type': 'password'}, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        fields=['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id=force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('The reset link is invalid', 401)
            
            user.set_password(password)
            user.save()
            return user
        except Exception as e:
            raise AuthenticationFailed('The reset link is invalid', 401)


class MovieSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = Movie
        # Need to set the branches in order to filter it
        fields = ['id', 'name', 'description', 'duration', 'image', 'coming_soon']


class BranchSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    city_name = serializers.CharField(source='city.name', read_only=True)
    rooms = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Branch
        fields = ['id', 'name', 'address', 'image', 'city', 'city_name', 'rooms', 'standart_price']

    def get_rooms(self, obj):
        return [room.id for room in obj.room_set.filter(active=True)]
    

class RoomSerializer(serializers.ModelSerializer):
    branch_name = serializers.CharField(source='branch.name', read_only=True)
    opens_at = serializers.TimeField(format='%H:%M', required=False)
    class Meta:
        model = Room
        fields = ['id', 'name', 'branch', 'branch_name', 'number_seats', 'layout', 'opens_at']


class CitySerializer(serializers.ModelSerializer):
    on_screen_movies_name = serializers.SerializerMethodField(read_only=True)
    branches = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'on_screen_movies', 'on_screen_movies_name', 'branches']

    def get_on_screen_movies_name(self, obj):
        return [movie.name for movie in obj.on_screen_movies.filter(active=True)]

    def get_branches(self, obj):
        return [branch.id for branch in obj.branch_set.filter(active=True)]


class SessionSerializer(serializers.ModelSerializer):

    room_name = serializers.CharField(source='room.name', read_only=True)
    movie_name = serializers.CharField(source='movie.name', read_only=True)
    number_seats = serializers.IntegerField(source='room.number_seats', read_only=True) 
    name = serializers.DateTimeField(source='start_time', read_only=True, format='%Y-%m-%d %H:%M')
    class Meta:
        model = Session
        fields = ['id', 'name', 'movie', 'room', 'start_time', 'end_time', 'seats', 'room_name', 'movie_name', 'number_seats']


class ShiftSerializer(serializers.ModelSerializer):
    movie_name = serializers.CharField(source='movie.name', read_only=True)
    class Meta:
        model = Shift
        fields = ['id', 'weekday', 'start_time', 'end_time', 'room', 'movie', 'movie_name']


class ShiftUpdateSerializer(serializers.ModelSerializer):
    list_shifts = serializers.JSONField(write_only=True)
    list_rooms = serializers.JSONField(write_only=True)
    class Meta:
        model = Shift
        fields = ['list_shifts', 'list_rooms']

class DiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'name', 'type', 'value']


class WeekdaySerializer(serializers.ModelSerializer):
    discount_value = serializers.CharField(source='discount.value', read_only=True)
    class Meta:
        model = Weekday
        fields = ['id', 'name', 'discount_value', 'discount']
        extra_kwargs = {
            'discount': {
                'required': True, 
                'allow_null': True
            }
        }


class MovieAdSerializer(serializers.ModelSerializer):
    movie_name = serializers.CharField(source='movie.name', read_only=True)
    class Meta:
        model = MovieAd
        fields = ['id', 'name','movie', 'image', 'movie_name']


class TicketTypeSerializer(serializers.ModelSerializer):
    discount_percentage = serializers.CharField(source='discount.value', read_only=True)
    class Meta:
        model = TicketType
        fields = ['id', 'name', 'discount', 'discount_percentage']

class TicketSerializer(serializers.ModelSerializer):
    type_name = serializers.CharField(source='type.name', read_only=True)
    class Meta:
        model = Ticket
        fields = ['id', 'bill', 'price', 'type', 'type_name', 'created_at']


class BillSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    user_name = serializers.CharField(source='user.name', read_only=True)
    discount = DiscountSerializer(read_only=True)
    branch = BranchSerializer(read_only=True, source='session.room.branch')
    room = RoomSerializer(read_only=True, source='session.room')
    city = CitySerializer(read_only=True, source='session.room.branch.city')
    qr_code = serializers.ImageField(max_length=None, use_url=True)
    session = SessionSerializer(read_only=True)
    tickets = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Bill
        fields = ['id', 'user', 'room','city', 'branch', 'user_name', 'subtotal', 'total', 'discount', 'created_at', 'session', 'seats', 'qr_code', 'tickets']
    def get_tickets(self, obj):
        return [ticket.id for ticket in obj.ticket_set.filter(active=True, bill=obj.id)]
    


class PaymentSerializer(serializers.Serializer):
    tickets_list = serializers.JSONField()
    subtotal = serializers.FloatField()
    total = serializers.FloatField()
    discount = serializers.JSONField(allow_null=True, required=True)
    session = serializers.JSONField()
    branch = serializers.JSONField()
    room = serializers.JSONField()
    user= serializers.JSONField()
    weekday= serializers.JSONField()
    movie = serializers.JSONField()
    seats = serializers.JSONField()

    class Meta:
        fields = ['tickets_list', 'subtotal', 'total', 'discount', 'session', 'branch', 'room', 'user', 'weekday', 'movie', 'seats']


    