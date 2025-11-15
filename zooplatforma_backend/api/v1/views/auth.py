from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.utils.encoding import force_str
from drf_spectacular.utils import extend_schema
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.contrib.auth.tokens import default_token_generator
from django.contrib.auth import get_user_model
from apps.users.models import ZooUser
from django.shortcuts import get_object_or_404
from apps.users.tasks import send_password_reset_email

User = get_user_model()

from api.v1.serializers.auth import (
    RegisterSerializer,
    CustomTokenObtainPairSerializer,
    CustomTokenRefreshSerializer,
    ComplaintSerializer,
    PasswordResetRequestSerializer
)

@extend_schema(tags=["Registration"])
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

@extend_schema(tags=["Authentication"])
class LoginView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    permission_classes = [AllowAny]

@extend_schema(tags=["Authentication"])
class RefreshTokenView(TokenRefreshView):
    serializer_class = CustomTokenRefreshSerializer
    permission_classes = [AllowAny]


class ActivateAccountView(APIView):
    def get(self, request, uidb64, token, format=None):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'status': 'Аккаунт успешно активирован'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Некорректная ссылка активации'}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        if not email:
            return Response({"detail": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if user:
                send_password_reset_email.delay(user.id)
                return Response({"detail": "Password reset email sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            pass

        return Response({"detail": "If the email exists, a reset link has been sent."}, status=status.HTTP_200_OK)



class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token, *args, **kwargs):
        password = request.data.get('password')
        password2 = request.data.get('password2')

        if password != password2:
            return Response({"detail": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.set_password(password)
            user.save()
            return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "The reset link is invalid or has expired."}, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestView(generics.GenericAPIView):
    serializer_class = PasswordResetRequestSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        user = ZooUser.objects.get(email=email)
        send_password_reset_email.delay(user.id)

        return Response(
            {"detail": "Если этот email зарегистрирован, вы получите письмо для сброса пароля."},
            status=status.HTTP_200_OK
        )



class ComplaintView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ComplaintSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        category = serializer.validated_data['category']
        message = serializer.validated_data['message']
        user_id = request.user.id
        send_complaint_email.delay(user_id, category, message)
        return Response({"detail": "Your complaint has been submitted."}, status=status.HTTP_201_CREATED)