from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator

from .models import User


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            city=validated_data['city'],
            state=validated_data['state'],
            twitter=validated_data['twitter']
        )
        user.set_password(validated_data['password'])
        user.save()
        user.password = '**hidden**'
        return user

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'city', 'state', 'twitter', 'password']
        extra_kwargs = {'first_name': {'required': True}, 'last_name': {'required': True}}
        validators = [
            UniqueTogetherValidator(
                queryset=User.objects.all(),
                fields=['email']
            )
        ]
