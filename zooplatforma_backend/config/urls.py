from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from api.v1.views.auth import RegisterView, LoginView, RefreshTokenView, ActivateAccountView, PasswordResetConfirmView, ComplaintView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("sign-up", RegisterView.as_view(), name="sign-up"),
    path('activate/<str:uidb64>/<str:token>/', ActivateAccountView.as_view(), name='activate-account'),
    path(
        "password-reset-confirm/<slug:uidb64>/<slug:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm"
    ),
    path("auth/token/refresh/", RefreshTokenView.as_view(), name="token_refresh"),
    path("auth", LoginView.as_view(), name="login"),
    path('complaint/', ComplaintView.as_view(), name='complaint'),
    path("api/v1/", include("api.v1.urls")),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("swagger/", SpectacularSwaggerView.as_view(url_name="schema"), name="schema-swagger-ui"),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
