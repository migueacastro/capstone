from django.contrib import admin
from .models import *

# Register your models here.
class WeekdayAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
class SessionAdmin(admin.ModelAdmin):
    list_display = ('id', 'start_time', 'end_time')
    list_filter = ('start_time', 'end_time')
admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Ticket)
admin.site.register(TicketType)
admin.site.register(Bill)
admin.site.register(Discount)
admin.site.register(Session, SessionAdmin)
admin.site.register(Branch)
admin.site.register(Room)
admin.site.register(City)
admin.site.register(MovieAd)
admin.site.register(Weekday, WeekdayAdmin)
admin.site.register(Shift)
admin.site.register(SessionGroup)
admin.site.register(SessionChannel)