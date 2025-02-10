from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from .models import *
from .serializers import *
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.core.mail import send_mail


# Create your views here.

User=get_user_model()


@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    user = authenticate(username=email, password=password)
    
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        # Assuming you have a related Customer model with a profile_picture field
        customer = user.customer  # Get the related Customer instance
        return Response({
            'user': {
                'username': user.get_username(),
                'email': user.email,
            },
            'token': token.key
        })
    
    return Response({"error": "Invalid email or password"}, status=400)


@api_view(['POST'])
def register(request):
    serializer=UserSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email=serializer.validated_data.get('email')
    password=serializer.validated_data.get('password')
    user=User.objects.create_user(email=email,password=password)
    if user:
        return Response({'message': 'User has been successfully created!'}, status=201)
    return Response({'error': 'Sorry, something went wrong!'}, status=400)
