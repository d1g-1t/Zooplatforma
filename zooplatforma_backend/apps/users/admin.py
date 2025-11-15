from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from apps.users.models import Curator, ZooUser, OwnerProfile


@admin.register(ZooUser)
class ZooUserAdmin(UserAdmin):
    list_display = (
        "is_active",
        "email",
        "email_is_hidden",
        "phone",
        "phone_is_hidden",
        "password",
        "first_name",
        "last_name",
        "date_birth",
        "address",
        "is_curator",
        "about_me_title",
        "about_me_text",
        "is_superuser",
        "is_staff"
    )
    list_filter = ("is_staff", "is_curator", "is_active")
    ordering = ("email",)
    search_fields = ("email", "first_name", "last_name")

    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "email_is_hidden",
                    "phone",
                    "phone_is_hidden",
                    "password",
                )
            },
        ),
        (
            ("Personal info"),
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "date_birth",
                    "address",
                    "about_me_title",
                    "about_me_text",
                    "avatar"
                )
            },
        ),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_staff",
                    "is_superuser",
                    "is_curator",
                    "is_active",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2", "first_name", "phone"),
            },
        ),
    )


@admin.register(Curator)
class CuratorAdmin(admin.ModelAdmin):
    list_display = ('user', 'get_username', 'get_email')
    list_filter = ('user__is_active',)
    search_fields = ('user__email', 'user__first_name', 'user__last_name')

    def get_username(self, obj):
        return obj.user.first_name  # Или другое поле, если username отсутствует
    get_username.short_description = 'Имя пользователя'
    get_username.admin_order_field = 'user__first_name'

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Электронная почта'
    get_email.admin_order_field = 'user__email'

@admin.register(OwnerProfile)
class OwnerProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'is_legal_entity', 'inn')
    search_fields = ('user__email', 'first_name', 'last_name', 'phone', 'email')
    list_filter = ('is_legal_entity',)