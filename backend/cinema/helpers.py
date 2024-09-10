from django.conf import settings
from datetime import datetime
from .models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth import get_user_model
from django.core.mail import EmailMessage
import jwt, threading

# This function will create a access token hash containing the user id and expiration date
def generate_access_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.now() + settings.TOKEN_DURATION, # The token will have a duration of the specified setting
        'iat': datetime.now()
    }
    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return access_token

def get_user_from_token(request):
    user_token = request.COOKIES.get('access_token')
    if user_token:
        try:
            payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])
            expiration_time = datetime.fromtimestamp(payload['exp'])
            if expiration_time > datetime.now():
                user_model = get_user_model()
                user = user_model.objects.filter(id=payload['user_id']).first()
                return user
            else:
                raise AuthenticationFailed('Token has expired')
        except jwt.ExpiredSignatureError:
            response = Response({'message': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
            response.delete_cookie('access_token')
            return response

def user_is_allowed(user_instance, superuser_only=False):
    return user_instance.is_admin or (user_instance.is_superuser and not superuser_only) 

class SafeViewSet(viewsets.ModelViewSet): # My modified version of a viewsets adapted to the way I handle authentication and permissions
    serializer_class = None
    superuser_only = False
    staff_get_required = False

    def post(self, request):
        try:
            user_instance = get_user_from_token(request)
            if (user_is_allowed(user_instance, self.superuser_only)):
                serializer = self.serializer_class(data = request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                elif serializer.errors:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'message': 'You do not have permission to perform this action'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request):
        try:
            user_instance = get_user_from_token(request)
            if (user_is_allowed(user_instance, self.superuser_only)):
                object_instance = self.get_object()
                serializer = self.serializer_class(object_instance, data = request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                elif serializer.errors:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                
                return Response({'message': 'You do not have permission to perform this action'}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        
    def delete(self, request):
        try:
            user_instance = get_user_from_token(request)
            if (user_is_allowed(user_instance, self.superuser_only)):
                object_instance = self.get_object()
                object_instance.active = False
                object_instance.save()
                return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    
    def get(self, request):
        if self.superuser_only or self.staff_get_required:
            if not user_is_allowed(request.user, self.superuser_only):
                return Response({'message': 'You do not have permission to perform this action'}, status=status.HTTP_403_FORBIDDEN)
            return super().get(request)
        return super().get(request)
    

class EmailThread(threading.Thread):
    def __init__(self, email):
        self.email = email
        threading.Thread.__init__(self)

    def run(self):
        self.email.send()

class Util:
    @staticmethod
    def send_email(data):
        email = EmailMessage(
            subject=data['email_subject'], 
            body=data['email_body'], 
            to=[data['to_email']])
        if data['email_file']:
            email.attach('image.jpg', data['email_file'].read(), 'image/png')
        if data['content_type'] == 'html':
            email.content_subtype = 'html'
        email.send()