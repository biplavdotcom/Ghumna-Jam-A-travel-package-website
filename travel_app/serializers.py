from .models import *
from rest_framework import serializers


# class UserSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model=User
#         fields=['id','username','email','contact_number','address','image',]
        
        
        
class CustomerSerializer(serializers.ModelSerializer):
    
    user=serializers.CharField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model=Customer
        fields=['id','user','first_name','middle_name','last_name','address','contact_number','gender']
        
        
        
class HotelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Hotel
        fields='__all__'
        
        
        
class SeasonalPriceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=SeasonalPrice
        fields='__all__'
        
        



class TravelPackageSerializer(serializers.ModelSerializer):
    seasonal_prices = SeasonalPriceSerializer(many=True, read_only=True)
    hotels = HotelSerializer(many=True, read_only=True)

    class Meta:
        model = TravelPackage
        fields = [
            'id', 'name', 'description', 'price', 'available_from', 
            'available_to', 'location', 'features','image', 'seasonal_prices', 'hotels'
        ]





class BookingSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())
    price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'customer', 'travel_package', 'booking_date', 
            'status', 'payment_status', 'travel_date', 'number_of_travelers', 'price'
        ]






class PaymentSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = [
            'id', 'booking', 'amount', 'payment_date', 'payment_method', 'payment_status'
        ]







class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = Review
        fields = [
            'id', 'user', 'travel_package', 'rating', 'comment', 'review_date', 'reply'
        ]






class WishListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = WishList
        fields = ['id', 'user', 'travel_package', 'added_date']
        