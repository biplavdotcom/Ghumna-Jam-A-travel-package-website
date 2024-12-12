from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from .pagination import CustomPagination


# class UserViewSet(viewsets.ModelViewSet):
    
#     queryset=User.objects.all()
#     serializer_class=UserSerializer
    
    
    
class CustomerViewSet(viewsets.ModelViewSet):
    
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer
    


class HotelViewSet(viewsets.ModelViewSet):
    
    queryset=Hotel.objects.all()
    serializer_class=HotelSerializer
    
    
    
class SeasonalPriceViewSet(viewsets.ModelViewSet):
    
    queryset=SeasonalPrice.objects.all()
    serializer_class=SeasonalPriceSerializer
    
    

class TravelPackageViewSet(viewsets.ModelViewSet):
    
    queryset=TravelPackage.objects.all()
    serializer_class=TravelPackageSerializer
    pagination_class=CustomPagination
    
    
    
class BookingViewSet(viewsets.ModelViewSet):
    
    queryset=Booking.objects.all()
    serializer_class=BookingSerializer
    
    
    
class PaymentViewSet(viewsets.ModelViewSet):
    
    queryset=Payment.objects.all()
    serializer_class=PaymentSerializer
    
    
    
class ReviewViewSet(viewsets.ModelViewSet):
    
    queryset=Review.objects.all()
    serializer_class=ReviewSerializer
    
    
    
    
class WishListViewSet(viewsets.ModelViewSet):
    
    queryset=WishList.objects.all()
    serializer_class=WishListSerializer


