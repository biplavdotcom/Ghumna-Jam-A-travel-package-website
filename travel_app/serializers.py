from .models import *
from rest_framework import serializers


class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.CharField(default=serializers.CurrentUserDefault())
    
    class Meta:
        model = Customer
        fields = ['id', 'user', 'first_name', 'middle_name', 'last_name', 'address', 
                 'contact_number', 'email', 'date_of_birth', 'gender', 'loyalty_points',
                 'preferred_payment_method']


class TourGuideSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = TourGuide
        fields = ['id', 'user', 'bio', 'experience_years', 'languages', 'specialties',
                 'certification', 'availability_status', 'hourly_rate']


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'description', 'price_per_night', 'features',
                 'contact_number', 'email', 'website', 'check_in_time', 'check_out_time',
                 'total_rooms', 'available_rooms', 'rating', 'image', 'room_types']


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = ['id', 'name', 'description', 'duration', 'difficulty_level',
                 'min_participants', 'max_participants', 'price', 'equipment_provided',
                 'safety_guidelines']


class TravelPackageSerializer(serializers.ModelSerializer):
    hotels = HotelSerializer(many=True, read_only=True)
    activities = ActivitySerializer(many=True, read_only=True)
    tour_guide = TourGuideSerializer(read_only=True)

    class Meta:
        model = TravelPackage
        fields = ['id', 'name', 'description', 'price', 'available_from', 'available_to',
                 'location', 'features', 'duration', 'max_participants', 'difficulty_level',
                 'included_services', 'excluded_services', 'meeting_point', 'image',
                 'hotels', 'activities', 'tour_guide', 'is_featured', 'cancellation_policy']


class SeasonalPriceSerializer(serializers.ModelSerializer):
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = SeasonalPrice
        fields = ['id', 'travel_package', 'season', 'start_date', 'end_date',
                 'price', 'discount_percentage']


class BookingSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = Booking
        fields = ['id', 'customer', 'travel_package', 'booking_date', 'status',
                 'payment_status', 'travel_date', 'number_of_travelers',
                 'special_requests', 'total_amount', 'cancellation_reason',
                 'emergency_contact']


class PaymentSerializer(serializers.ModelSerializer):
    booking = BookingSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = ['id', 'booking', 'amount', 'payment_date', 'payment_method',
                 'payment_status', 'transaction_id', 'payment_proof', 'refund_status']


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = Review
        fields = ['id', 'user', 'travel_package', 'rating', 'comment', 'review_date',
                 'reply', 'reply_date', 'images', 'likes', 'is_verified']


class WishListSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    travel_package = serializers.PrimaryKeyRelatedField(queryset=TravelPackage.objects.all())

    class Meta:
        model = WishList
        fields = ['id', 'user', 'travel_package', 'added_date', 'notes']