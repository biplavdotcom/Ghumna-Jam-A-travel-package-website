from django.contrib import admin
from django.urls import path,include
from .views import *
from rest_framework.routers import SimpleRouter

routers=SimpleRouter()

# routers.register('user',UserViewSet,basename='user')
routers.register('customer',CustomerViewSet,basename='customer')
routers.register('hotel',HotelViewSet,basename='hotel')
routers.register('seasons',SeasonalPriceViewSet,basename='seasons')
routers.register('travelpackage',TravelPackageViewSet,basename='travelpackage')
routers.register('booking',BookingViewSet,basename='booking')
routers.register('payment',PaymentViewSet,basename='payment')
routers.register('review',ReviewViewSet,basename='review')
routers.register('wishlist',WishListViewSet,basename='wishlist')
# routers.register('activity',WishListViewSet,basename='activity')
# routers.register('tourguide',WishListViewSet,basename='tourguide')


urlpatterns = [
    
]+routers.urls