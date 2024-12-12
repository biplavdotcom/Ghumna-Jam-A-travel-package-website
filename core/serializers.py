from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User=get_user_model


class UserSerializer(serializers.Serializer):
    email=serializers.EmailField()
    password=serializers.CharField()
    confirm_password=serializers.CharField()
    
    
    def validate_email(self,value):
        user=User.objects.filter(email=value)
        if user:
            raise serializers.ValidationError("This Email is already in use.")
        return value
    
    
    def validate(self,attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({
                'details':'Password and confirm password doesnot match'
                        
            },{
                'note that':'Same password required on both the fields.'
            })
            
        return super().validate(attrs)
    
    
    def validate_password(self,value):
        if len(value)<8:
            raise serializers.ValidationError({
                'details':'The password field needs more than 8 characters'
            })
        
        return value
        