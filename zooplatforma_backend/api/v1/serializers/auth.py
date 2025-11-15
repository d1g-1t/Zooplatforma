from django.contrib.auth import get_user_model
from rest_framework import serializers, generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from django.contrib.auth.password_validation import validate_password
from apps.users.constants import MAX_STR_LENGTH, MAX_PHONE_LENGTH
from apps.users.tasks import send_activation_email, send_password_reset_email
from apps.users.models import ZooUser

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'}
    )
    phone = serializers.CharField(
        required=True,
        max_length=MAX_PHONE_LENGTH
    )
    first_name = serializers.CharField(
        required=True,
        max_length=MAX_STR_LENGTH
    )
    last_name = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=MAX_STR_LENGTH
    )

    class Meta:
        model = User
        fields = ('email', 'phone', 'first_name', 'last_name', 'password', 'password2')
        extra_kwargs = {
            'email': {'required': True},
            'phone': {'required': True},
            'first_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": ["Пароли не совпадают."]
            })
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')

        user = User.objects.create_user(**validated_data)
        user.is_active = False
        user.save()

        send_activation_email.delay(user.id)
        return user

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {
            "success": True,
            "message": "Пользователь успешно зарегистрирован!",
            "user": representation
        }


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return {
            "success": True,
            "message": "Аутентификация прошла успешно.",
            "tokens": data
        }


class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        return {
            "success": True,
            "message": "Токен успешно обновлён.",
            "tokens": data
        }
    
    
class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Пользователь с таким email не найден.')
        return value

    def save(self):
        email = self.validated_data['email']
        user = User.objects.get(email=email)
        send_password_reset_email.delay(user.id)


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True)

    def validate_password(self, value):
        validate_password(value)
        return value

    def save(self, user):
        user.set_password(self.validated_data['password'])
        user.save()


class PasswordResetConfirmSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Пароли не совпадают."})

        return attrs


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not ZooUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Пользователь с таким email не найден.")
        return value

class ComplaintSerializer(serializers.Serializer):
    category = serializers.CharField(max_length=255)
    message = serializers.CharField(max_length=1024)
