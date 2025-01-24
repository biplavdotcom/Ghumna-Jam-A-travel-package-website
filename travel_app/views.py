# from django.shortcuts import render
from rest_framework import viewsets
from .models import *
from .serializers import *
from .pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response
# from django.http import FileResponse, HttpResponse
from django.db.models import Avg, Count, Q
from django.utils import timezone
# from datetime import timedelta
from rest_framework import viewsets, status, filters, mixins
from rest_framework.decorators import action
from rest_framework.response import Response


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
    

    @action(detail=True, methods=['post'])
    def update_loyalty_points(self, request, pk=None):
        customer = self.get_object()
        points = request.data.get('points', 0)
        customer.loyalty_points += int(points)
        customer.save()
        return Response({'loyalty_points': customer.loyalty_points})

    @action(detail=True, methods=['get'])
    def booking_history(self, request, pk=None):
        customer = self.get_object()
        bookings = Booking.objects.filter(customer=customer).order_by('-booking_date')
        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data)


class TourGuideViewSet(viewsets.ModelViewSet):
    queryset = TourGuide.objects.all()
    serializer_class = TourGuideSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['specialties', 'languages', 'user__username']
    ordering_fields = ['experience_years', 'hourly_rate']

    @action(detail=True, methods=['patch'])
    def toggle_availability(self, request, pk=None):
        guide = self.get_object()
        guide.availability_status = not guide.availability_status
        guide.save()
        return Response({'availability_status': guide.availability_status})

    @action(detail=True, methods=['get'])
    def upcoming_tours(self, request, pk=None):
        guide = self.get_object()
        upcoming_packages = TravelPackage.objects.filter(
            tour_guide=guide,
            available_from__gte=timezone.now().date()
        )
        serializer = TravelPackageSerializer(upcoming_packages, many=True)
        return Response(serializer.data)


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'location', 'features']
    ordering_fields = ['price_per_night', 'rating']

    def get_queryset(self):
        queryset = Hotel.objects.all()
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)
        rating = self.request.query_params.get('rating', None)
        
        if min_price:
            queryset = queryset.filter(price_per_night__gte=min_price)
        if max_price:
            queryset = queryset.filter(price_per_night__lte=max_price)
        if rating:
            queryset = queryset.filter(rating__gte=rating)
            
        return queryset

    @action(detail=True, methods=['get'])
    def room_availability(self, request, pk=None):
        hotel = self.get_object()
        check_in = request.query_params.get('check_in')
        check_out = request.query_params.get('check_out')
        
        return Response({
            'total_rooms': hotel.total_rooms,
            'available_rooms': hotel.available_rooms,
            'room_types': hotel.room_types,
            'check_in_time': hotel.check_in_time,
            'check_out_time': hotel.check_out_time
        })


class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'difficulty_level', 'description']
    ordering_fields = ['price', 'duration']

    @action(detail=True, methods=['get'])
    def upcoming_sessions(self, request, pk=None):
        activity = self.get_object()
        packages = activity.travel_packages.filter(
            available_from__gte=timezone.now().date()
        ).order_by('available_from')
        serializer = TravelPackageSerializer(packages, many=True)
        return Response(serializer.data)


class TravelPackageViewSet(viewsets.ModelViewSet):
    queryset = TravelPackage.objects.all()
    serializer_class = TravelPackageSerializer
    pagination_class = CustomPagination
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'location', 'difficulty_level', 'description']
    ordering_fields = ['price', 'duration', 'available_from']

    def get_queryset(self):
        queryset = TravelPackage.objects.all()
        location = self.request.query_params.get('location', None)
        max_price = self.request.query_params.get('max_price', None)
        difficulty = self.request.query_params.get('difficulty', None)
        duration = self.request.query_params.get('duration', None)
        available_date = self.request.query_params.get('available_date', None)

        if location:
            queryset = queryset.filter(location__icontains=location)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        if difficulty:
            queryset = queryset.filter(difficulty_level=difficulty)
        if duration:
            queryset = queryset.filter(duration__lte=duration)
        if available_date:
            queryset = queryset.filter(
                available_from__lte=available_date,
                available_to__gte=available_date
            )
            
        return queryset

    @action(detail=True, methods=['get'])
    def full_details(self, request, pk=None):
        package = self.get_object()
        avg_rating = Review.objects.filter(travel_package=package).aggregate(Avg('rating'))
        total_reviews = Review.objects.filter(travel_package=package).count()
        
        data = TravelPackageSerializer(package).data
        data.update({
            'average_rating': avg_rating['rating__avg'],
            'total_reviews': total_reviews,
            'upcoming_dates': package.available_from,
            'seasonal_prices': SeasonalPriceSerializer(
                package.seasonal_prices.all(), many=True
            ).data
        })
        return Response(data)


# class BookingViewSet(viewsets.ModelViewSet):
#     queryset = Booking.objects.all()
#     serializer_class = BookingSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         if hasattr(user, 'customer'):
#             return Booking.objects.filter(customer=user.customer).order_by('-booking_date')
#         return Booking.objects.none()

#     def perform_create(self, serializer):
#         serializer.save(customer=self.request.user.customer)

    @action(detail=True, methods=['post'])
    def cancel_booking(self, request, pk=None):
        booking = self.get_object()
        if booking.status == 'Completed':
            return Response(
                {'error': 'Cannot cancel completed booking'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reason = request.data.get('reason', '')
        booking.status = 'Cancelled'
        booking.cancellation_reason = reason
        booking.save()
        
        # Handle refund logic here if needed
        return Response({'status': 'Booking cancelled successfully'})


class BookingViewSet(viewsets.ModelViewSet):
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Booking.objects.select_related(
            'customer',
            'travel_package'
        ).filter(customer__user=user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(customer=self.request.user.customer)

    @action(detail=True, methods=['post'])
    def cancel_booking(self, request, pk=None):
        booking = self.get_object()
        if booking.status == 'Completed':
            return Response(
                {'error': 'Cannot cancel completed booking'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        reason = request.data.get('reason', '')
        booking.status = 'Cancelled'
        booking.cancellation_reason = reason
        booking.save()
        
        # Handle refund logic here if needed
        return Response({'status': 'Booking cancelled successfully'})


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, 'customer'):
            return Payment.objects.filter(booking__customer=user.customer)
        return Payment.objects.none()

    @action(detail=True, methods=['post'])
    def process_refund(self, request, pk=None):
        payment = self.get_object()
        if payment.payment_status == 'Refunded':
            return Response(
                {'error': 'Payment already refunded'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        payment.payment_status = 'Refunded'
        payment.refund_status = 'Processed'
        payment.save()
        
        # Update booking status
        booking = payment.booking
        booking.status = 'Cancelled'
        booking.save()
        
        return Response({'status': 'Refund processed successfully'})


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = ['rating', 'review_date', 'likes']

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_like(self, request, pk=None):
        review = self.get_object()
        review.likes += 1
        review.save()
        return Response({'likes': review.likes})

    @action(detail=True, methods=['post'])
    def add_reply(self, request, pk=None):
        review = self.get_object()
        reply = request.data.get('reply', '')
        review.reply = reply
        review.reply_date = timezone.now()
        review.save()
        return Response({'status': 'Reply added successfully'})


class WishListViewSet(viewsets.ModelViewSet):
    serializer_class = WishListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WishList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        if WishList.objects.filter(
            user=request.user,
            travel_package_id=request.data.get('travel_package')
        ).exists():
            return Response(
                {'detail': 'Package already in wishlist'},
                status=status.HTTP_400_BAD_REQUEST
            )
        return super().create(request, *args, **kwargs)

    @action(detail=False, methods=['get'])
    def recommended(self, request):
        wishlist_packages = WishList.objects.filter(user=request.user).values_list(
            'travel_package__location', flat=True
        )
        recommended = TravelPackage.objects.filter(
            location__in=wishlist_packages
        ).exclude(
            id__in=WishList.objects.filter(user=request.user).values_list(
                'travel_package', flat=True
            )
        )[:5]
        serializer = TravelPackageSerializer(recommended, many=True)
        return Response(serializer.data)


