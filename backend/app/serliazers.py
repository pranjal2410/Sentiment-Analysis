from rest_framework import serializers
from . import models


class HelloSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=10)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ['id', 'fname', 'lname', 'email', 'password', 'city', 'state', 'twitter']
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

        def create(self, validated_data):
            user = models.Profile.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                fname=validated_data['fname'],
                lname=validated_data['lname'],
                city=validated_data['city'],
                state=validated_data['state']
            )
            return user
