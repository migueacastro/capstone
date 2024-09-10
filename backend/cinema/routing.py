from django.urls import re_path

from .consumers import *

ws_urlpatterns = [
    re_path(r'api/sessions/(?P<id>\d+)', SessionConsumer.as_asgi()),
]