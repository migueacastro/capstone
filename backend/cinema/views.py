from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .helpers import *
from .serializers import *
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import viewsets, generics
from django.forms.models import model_to_dict
import jwt
import json

class UserRegistrationView(APIView):
    # Use the registration serializer with its respective authentication
    serializer_class = UserRegistrationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    # Create a new user and return a JWT
    def post(self, request):
        
        # Validate the request
        serializer = self.serializer_class(data = request.data)
        
        if serializer.is_valid(raise_exception=True):
            
            password = serializer.validated_data.get('password', None)
            confirmPassword = serializer.validated_data.get('confirmPassword', None)

            # Check if passwords match
            if password != confirmPassword:
                raise AuthenticationFailed({'confirmPassword': ['Passwords do not match']})
            
            # Save the user
            new_user = serializer.save()
            if new_user:
                # Generate an access token
                access_token = generate_access_token(new_user)
                data = {'access_token': access_token }
                response = Response(data, status=status.HTTP_201_CREATED)

                # VERY IMPORTANT: Here the authentications cookies are set, otherwise, you are COOKED.
                response.set_cookie(key = 'access_token', value = access_token, httponly=False, secure=True, samesite='None')
                return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    # Use serializers for the login
    serializer_class = UserLoginSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    
    def post(self, request):
        # Retrieve credentials
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        
        # Validate credentials
        if not password:
            raise AuthenticationFailed({'password': ['This field is required']})
        elif not email:
            raise AuthenticationFailed({'email': ['This field is required']})
        
        user_instance = authenticate(email = email, password = password)
        if not user_instance:
            raise AuthenticationFailed({'password': ['Invalid credentials']})

        if user_instance.is_active:
            # Generate an access token
            user_access_token = generate_access_token(user_instance)
            response = Response()

            # VERY IMPORTANT: Here the authentications cookies are set, otherwise, you are COOKED.
            response.set_cookie(key='access_token', value=user_access_token, httponly=False, secure=True, samesite='None', )
            response.data = {
                'access_token': user_access_token,
            }

            return response
        return Response({'message': 'Server has been destroyed to pieces. Come back later!'})

class UserLogoutView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token')
        if user_token:
            response = Response()
            response.delete_cookie('access_token')
            response.data = {
                'message': 'User logged out successfully!'
            }
            return response
        response = Response()
        response.data = {
            'message': 'No user logged in'
        }
        return response

class UserProfileView(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request):
        user_token = request.COOKIES.get('access_token')

        if not user_token:
            raise AuthenticationFailed('Unauthorized')
        try:
            payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])

            user_model = get_user_model()
            user = user_model.objects.filter(id = payload['user_id']).first()
            user_serializer = UserSerializer(user)
            return Response(user_serializer.data)
        
        except jwt.ExpiredSignatureError:
            response = Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie('access_token')
            return response

class UserViewSet(SafeViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(active=True, is_staff=False)
    superuser_only = False
    staff_get_required = True

    def post(self, request):

        # Validate the request
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid(raise_exception=True):

            password = serializer.validated_data.get('password', None)
            confirmPassword = serializer.validated_data.get('confirmPassword', None)

            # Check if passwords match
            if password != confirmPassword:
                raise AuthenticationFailed({'confirmPassword': ['Passwords do not match']})

            # Save the user
            new_user = serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):

        # Validate the request
        user_instance = self.get_object()
        serializer = self.serializer_class(user_instance, data=request.data)

        if serializer.is_valid(raise_exception=True):

            password = serializer.validated_data.get('password', None)
            confirmPassword = serializer.validated_data.get('confirmPassword', None)

            # Check if passwords match
            if password != confirmPassword:
                raise AuthenticationFailed({'confirmPassword': ['Passwords do not match']})

            # Save the user
            updated_user = serializer.save()
            if updated_user:
                return Response(status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RequestPasswordResetView(generics.GenericAPIView):

    serializer_class = ResetPasswordEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data.get('email', None)

        if User.objects.filter(email=email).exists():
            
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(str(user.id).encode())
            token = PasswordResetTokenGenerator().make_token(user)

            current_site = settings.FRONTEND_URL
            relativeLink = f'password-reset/{uidb64}/{token}'
            absurl = 'http://'+current_site+ relativeLink

            email_body = f'Hello {user.name.split()[0]}, \n Use the link below to reset your password  \n' + absurl
            data = {
                'email_body': email_body,
                'to_email': user.email,
                'email_subject': 'Reset your password'
            }
            Util.send_email(data)
            return Response({'message': 'Password reset link has been sent to your email'}, status=status.HTTP_200_OK)

        return Response({'message': 'Email not found'}, status=status.HTTP_400_BAD_REQUEST)
        
class PasswordTokenCheckView(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                Response({'message': 'Token is not valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_400_BAD_REQUEST)

            return Response({'message': 'Credentials are valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except DjangoUnicodeDecodeError as identifier:
            return Response({'message': 'Token is not valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_400_BAD_REQUEST)
        
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True,'message': 'Password reset success'}, status=status.HTTP_200_OK)

class StaffViewSet(SafeViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(active=True, is_staff=True)
    superuser_only = True


class MovieViewSet(SafeViewSet):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(active=True)

class BranchViewSet(SafeViewSet):
    queryset = Branch.objects.filter(active=True)
    serializer_class = BranchSerializer

class CityViewSet(SafeViewSet):
    queryset = City.objects.filter(active=True)
    serializer_class = CitySerializer

class MovieAdViewSet(SafeViewSet):
    queryset = MovieAd.objects.filter(active=True)
    serializer_class = MovieAdSerializer

class TicketTypeViewSet(SafeViewSet):
    queryset = TicketType.objects.filter(active=True)
    serializer_class = TicketTypeSerializer
    
class TicketViewSet(SafeViewSet):
    queryset = Ticket.objects.filter(active=True)
    serializer_class = TicketSerializer

class DiscountViewSet(SafeViewSet):
    queryset = Discount.objects.filter(active=True)
    serializer_class = DiscountSerializer

class AgeDiscountViewSet(SafeViewSet):
    queryset = Discount.objects.filter(type='AGE', active=True)
    serializer_class = DiscountSerializer

class DayDiscountViewSet(SafeViewSet):
    queryset = Discount.objects.filter(type='DAY', active=True)
    serializer_class = DiscountSerializer

class BillViewSet(SafeViewSet):
    queryset = Bill.objects.filter(active=True)
    serializer_class = BillSerializer

class SessionViewSet(SafeViewSet):
    queryset = Session.objects.filter(active=True)
    serializer_class = SessionSerializer

class RoomViewSet(SafeViewSet):
    queryset = Room.objects.filter(active=True)
    serializer_class = RoomSerializer

class WeekdayViewSet(SafeViewSet):
    queryset = Weekday.objects.filter(active=True)
    serializer_class = WeekdaySerializer

class ShiftViewSet(SafeViewSet):
    queryset = Shift.objects.filter(active=True)
    serializer_class = ShiftSerializer  

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            room_id = serializer.validated_data.get('room_id', None)
            serializer.validated_data['seats'] = Room.objects.get(id=room_id).layout
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

class ShiftUpdateView(generics.GenericAPIView):
    serializer_class = ShiftUpdateSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            list_shifts_db = Shift.objects.all()
            list_shifts_submited = serializer.validated_data.get('list_shifts', None)

            for shift in list_shifts_db:
                shift_exists = False
                for shift_submited in list_shifts_submited:
                    if (shift.id == shift_submited['id']):
                        shift.movie = Movie.objects.get(id=shift_submited['movie']) if shift_submited['movie'] else None
                        shift.weekday = Weekday.objects.get(id=shift_submited['weekday']) if shift_submited['weekday'] else None
                        shift.start_time = shift_submited['start_time']
                        shift.end_time = shift_submited['end_time']
                        shift.room = Room.objects.get(id=shift_submited['room']) if shift_submited['room'] else None
                        shift.save()

                        shift_exists = True
                        break

                if (not shift_exists):
                    shift.active = False
                    shift.save()

                
            for shift in list_shifts_submited:
                if not (Shift.objects.filter(id=shift['id']).exists()):
                    new_shift = Shift.objects.create(
                        movie = Movie.objects.get(id=shift['movie']) if shift['movie'] else None,
                        weekday = Weekday.objects.get(id=shift['weekday']) if shift['weekday'] else None, 
                        start_time = shift['start_time'],
                        end_time = shift['end_time'],
                        room = Room.objects.get(id=shift['room']) if shift['room'] else None

                    )
                    new_shift.save()

            list_rooms = serializer.validated_data.get('list_rooms', None)
            for room in list_rooms:
                try: 
                    room_instance = Room.objects.get(id=room['id'])
                    room_instance.opens_at = room['opens_at']
                    room_instance.save()
                except Room.DoesNotExist:
                    continue
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ShiftLastIdView(generics.GenericAPIView):
    def get(self, request):
        try:
            last_shift = Shift.objects.latest('id')
            return Response({'last_shift_id': last_shift.id}, status=status.HTTP_200_OK)
        except Shift.DoesNotExist:
            return Response({'last_shift_id': 0}, status=status.HTTP_200_OK)
        

class PaymentProcessView(generics.GenericAPIView):
    serializer_class = PaymentSerializer
    def post(self, request):
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            # Funny things begin here
            user_instance = User.objects.get(id=serializer.validated_data['user']['id'])

            if serializer.validated_data['discount']:
                discount_instance = Discount.objects.get(id=serializer.validated_data['discount']['id'])
            else:
                discount_instance = None

            session_instance = Session.objects.get(id=serializer.validated_data['session']['id'])

            
            newBill = Bill.objects.create(
                user = user_instance,
                subtotal = serializer.validated_data['subtotal'],
                total = serializer.validated_data['total'],
                discount = discount_instance,
                session = session_instance,
                seats = serializer.validated_data['seats'],
                
            )
            newBill.url = 'http://' + settings.FRONTEND_URL + '/bills/' + str(newBill.id)


            for ticket in serializer.validated_data['tickets_list']:
                ticket_type_instance = TicketType.objects.get(id=ticket['type'])
                ticket_instance = Ticket.objects.create(
                    bill = newBill,
                    type = ticket_type_instance,
                    price = ticket['price'])

            newBill.save()
            
            email_body = f"""<h1>Hello {user_instance.name.split()[0]}</h1>
            <h2>Thank you for your purchase. Here is the link to see your bill</h2>
            <p>{newBill.url}</p>
            <h2>Or scan the QR code below</h2>
            <img src="{newBill.qr_code}"/>
    """

            data = {
                'email_body': email_body,
                'to_email': user_instance.email,
                'email_subject': 'Bill processed successfully',
                'content_type': 'html',
                'email_file': newBill.qr_code

            }
            Util.send_email(data)
            return Response({'bill': newBill.id}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class BillViewSet(SafeViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillSerializer

