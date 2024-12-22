from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from .pagination import CustomPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from rest_framework.response import Response
from django.http import FileResponse, HttpResponse



# class UserViewSet(viewsets.ModelViewSet):
    
#     queryset=User.objects.all()
#     serializer_class=UserSerializer
    
    
    
class CustomerViewSet(viewsets.ModelViewSet):
    
    queryset=Customer.objects.all()
    serializer_class=CustomerSerializer
    permission_classes=(IsAuthenticated,)

# yo chai customized queryset based on the users role
    def get_queryset(self):
        user=self.request.user   
        return Customer.objects.filter(user=user)
    
    
    def list(self,request,*args, **kwargs):
        customer=self.get_queryset().first() #yesle chaia first ko object lai fetch garyo
        serializer=self.serializer_class(customer)#yesle fetched object lai serialized garyo
        return Response(serializer.data)#yesle chai serialized data ko response pathayo
    
    def update(self,request,*args, **kwargs):
        customer=self.get_queryset().first()#fetches first customer object
        context={}#creates the dictionary
        context['request']=request#addds the request to the contxt for serializzer
        serializer=self.serializer_class(data=request.data,instance=customer,context=request)
        serializer.is_valid(raise_exception=True)#validates the incoming data
        serializer.save()#saves the changes to the db
        return Response(serializer.data)
    


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


