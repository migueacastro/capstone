from django.db import models
from django.conf import settings
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw
import uuid

# Create your models here.

DAYS_OF_WEEK = (
    (0, 'Monday'),
    (1, 'Tuesday'),
    (2, 'Wednesday'),
    (3, 'Thursday'),
    (4, 'Friday'),
    (5, 'Saturday'),
    (6, 'Sunday'),
)

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have a password')
        
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have a password')
        
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user
    
    def delete_user(self, email):
        user = self.get(email=email)
        user.is_active = False
        user.save()

class User(AbstractBaseUser, PermissionsMixin):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    


# Cinema related models here

class Discount(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    value = models.FloatField(blank=True, null=True)
    type = models.CharField(max_length=3, blank=True, null=True, choices=
    (
        ('AGE', 'Age'),
        ('DAY', 'Day'),
    ), default='DAY')
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    

class Weekday(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    discount = models.ForeignKey('Discount', on_delete=models.DO_NOTHING, null=True, blank=True)

    def __str__(self):
        return self.name
    
class TicketType(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    discount = models.ForeignKey('Discount', on_delete=models.DO_NOTHING, null=True, blank=True)
    active = models.BooleanField(default=True)


class Bill(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('User', on_delete=models.DO_NOTHING)
    subtotal = models.FloatField(null=True, blank=True)
    total = models.FloatField(null=True, blank=True)
    discount = models.ForeignKey('Discount', on_delete=models.DO_NOTHING, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    url = models.URLField(null=True, blank=True)
    qr_code = models.ImageField(upload_to='bills/qr-codes', null=True, blank=True)
    active = models.BooleanField(default=True)
    session = models.ForeignKey('Session', on_delete=models.DO_NOTHING, null=True, blank=True)
    seats = models.JSONField(null=True, blank=True)

    def save(self, *args, **kwargs):
        
        
        qrcode_img = qrcode.make(self.url)
        qrcode_img = qrcode_img.resize((290, 290))
        canvas = Image.new('RGB', (290, 290), 'white')
        draw = ImageDraw.Draw(canvas)
        canvas.paste(qrcode_img)
        fname = f'bill-{self.id}.png'
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        self.qr_code.save(fname, File(buffer), save=False)
        canvas.close()
        super().save(*args, **kwargs)


class Ticket(models.Model):
    id = models.BigAutoField(primary_key=True)
    bill = models.ForeignKey('Bill', on_delete=models.DO_NOTHING, null=True, blank=True)
    type = models.ForeignKey('TicketType', on_delete=models.DO_NOTHING, null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Ticket {self.id}" 


class Movie(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.PositiveIntegerField()
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='movies/preview-images', null=True, blank=True)
    coming_soon = models.BooleanField(default=False)
    def __str__(self):
        return self.name


class Shift(models.Model):
    id = models.BigAutoField(primary_key=True)
    movie = models.ForeignKey('Movie', on_delete=models.DO_NOTHING)
    weekday = models.ForeignKey('Weekday', on_delete=models.DO_NOTHING)
    start_time = models.TimeField()
    end_time = models.TimeField()
    active = models.BooleanField(default=True)
    room = models.ForeignKey('Room', on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.movie.name


class Session(models.Model):
    id = models.BigAutoField(primary_key=True)
    movie = models.ForeignKey('Movie', on_delete=models.DO_NOTHING)
    room = models.ForeignKey('Room', on_delete=models.DO_NOTHING)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    active = models.BooleanField(default=True)
    seats = models.JSONField(null=True, blank=True)


class Room(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    branch = models.ForeignKey('Branch', on_delete=models.DO_NOTHING)
    layout = models.JSONField(null=True, blank=True)
    active = models.BooleanField(default=True)
    number_seats = models.PositiveIntegerField(null=True, blank=True)
    opens_at = models.TimeField( default="12:30")
    def __str__(self):
        return self.name
    
    
class City(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    on_screen_movies = models.ManyToManyField(Movie)
    active = models.BooleanField(default=True)

    def __str__(self):
        return self.name


class Branch(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.ForeignKey('City', on_delete=models.DO_NOTHING, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)
    image = models.ImageField(upload_to='branches/images', null=True, blank=True)
    standart_price = models.FloatField(null=True, blank=True)
    def __str__(self):
        return self.name
    
class MovieAd(models.Model):
    id = models.BigAutoField(primary_key=True)
    movie = models.ForeignKey('Movie', on_delete=models.DO_NOTHING)
    image = models.ImageField(upload_to='ads/images', null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    active = models.BooleanField(default=True)

# Session objects for consumer 

class SessionGroup(models.Model):
    id = models.CharField(primary_key=True, max_length=255)

class SessionChannel(models.Model):
    id = models.CharField(primary_key=True, max_length=255)
    group = models.CharField(max_length=255)
    data = models.JSONField(null=True, blank=True)

    