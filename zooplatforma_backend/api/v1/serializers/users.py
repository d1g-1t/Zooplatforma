from djoser.serializers import UserCreateSerializer as BaseUserCreateSerializer, UserSerializer as BaseUserSerializer
from rest_framework import serializers
from apps.users.models import ZooUser


class UserCreateSerializer(BaseUserCreateSerializer):
    class Meta(BaseUserCreateSerializer.Meta):
        model = ZooUser
        fields = ('id', 'email', 'password', 're_password')
        extra_kwargs = {'password': {'write_only': True}}


class UserSerializer(BaseUserSerializer):
    class Meta(BaseUserSerializer.Meta):
        model = ZooUser
        fields = ('id', 'email')