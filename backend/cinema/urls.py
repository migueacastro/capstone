from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('movies', MovieViewSet, basename='movies')
router.register('branches', BranchViewSet, basename='branches')
router.register('cities', CityViewSet, basename='cities')
router.register('movieads', MovieAdViewSet, basename='movieads')

router.register('tickets', TicketViewSet, basename='tickets')
router.register('ticket-types', TicketTypeViewSet, basename='ticket-types')
router.register('day-discounts', DayDiscountViewSet, basename='day-discounts')
router.register('age-discounts', AgeDiscountViewSet, basename='age-discounts')

router.register('sessions', SessionViewSet, basename='sessions')
router.register('rooms', RoomViewSet, basename='rooms')
router.register('users', UserViewSet, basename='users')
router.register('staff', StaffViewSet, basename='staff')
router.register('shifts', ShiftViewSet, basename='shifts')
router.register('weekdays', WeekdayViewSet, basename='weekdays')
router.register('bills', BillViewSet, basename='bills')


urlpatterns = router.urls

urlpatterns += [
    path('register', UserRegistrationView.as_view()),
    path('login', UserLoginView.as_view()),
    path('logout', UserLogoutView.as_view()),
    path('user', UserProfileView.as_view()),
    path('request-reset-email', RequestPasswordResetView.as_view(), name='request-reset-email'),
    path('password-reset/<uidb64>/<token>', PasswordTokenCheckView.as_view(), name='password-reset'),
    path('password-reset-complete', SetNewPasswordAPIView.as_view(), name='password-reset-complete'),
    path('get-last-shiftid', ShiftLastIdView.as_view()),
    path('update-shifts', ShiftUpdateView.as_view()),
    path('pay', PaymentProcessView.as_view()),
    
]
