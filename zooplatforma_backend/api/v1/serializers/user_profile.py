import base64
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.password_validation import validate_password
from django.core.files.base import ContentFile
from rest_framework import serializers

from apps.announcements.constants import (
    LOOKING_HOME,
    LOST_FOUND,
)
from apps.announcements.models.announcements import (
    Announcement,
    AnnouncementImage
)
from apps.pets.models import PetPhoto
from apps.pets.models.owner import PetOwner
from apps.users.models import ZooUser


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        if isinstance(data, str) and data.startswith('data:image'):
            format, imgstr = data.split(';base64,')
            ext = format.split('/')[-1]
            data = ContentFile(base64.b64decode(imgstr), name='temp.' + ext)
        return super().to_internal_value(data)


class PetPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = PetPhoto
        fields = ("photo",)


class PetSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="pet.name")
    photo = serializers.SerializerMethodField()

    class Meta:
        model = PetOwner
        fields = ("id", "name", "photo")

    def get_photo(self, obj):
        photos = obj.pet.photos.filter(main_photo=True)
        return PetPhotoSerializer(photos, many=True).data


class AnnouncementPhotoSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnnouncementImage
        fields = ("image",)


class AnnouncementSerializer(serializers.ModelSerializer):
    name = serializers.ReadOnlyField(source="pet.name")
    photo = serializers.SerializerMethodField()
    immediately = serializers.SerializerMethodField()

    class Meta:
        model = Announcement
        fields = (
            'id',
            'name',
            'photo',
            'immediately'
        )

    def get_photo(self, obj):
        photo = obj.announcement_images.filter(main_photo=True)
        return AnnouncementPhotoSerializer(photo).data

    def get_immediately(self, obj):
        return "Срочно" if obj.immediately else "Не срочно"


class ZooUserSerializer(serializers.ModelSerializer):
    avatar = Base64ImageField(required=False, allow_null=True)
    pets = serializers.SerializerMethodField()
    homes_found_number = serializers.SerializerMethodField()
    pets_found_number = serializers.SerializerMethodField()
    co_curator_announcements = serializers.SerializerMethodField()
    active_announcements = serializers.SerializerMethodField()
    completed_announcements = serializers.SerializerMethodField()

    class Meta:
        model = ZooUser
        fields = (
            'first_name',
            'last_name',
            'address',
            'email',
            'email_is_hidden',
            'phone',
            'phone_is_hidden',
            'is_curator',
            'about_me_title',
            'about_me_text',
            'avatar',
            'pets',
            'homes_found_number',
            'pets_found_number',
            'active_announcements',
            'completed_announcements',
            'co_curator_announcements'
        )

    def get_pets(self, obj):
        pets = PetOwner.objects.filter(phone=obj.phone)
        return PetSerializer(pets, many=True).data

    def get_active_announcements(self, obj):
        active_announcements = obj.users_announcement.filter(
            published=True
        )[:6]
        return AnnouncementSerializer(active_announcements, many=True).data

    def get_completed_announcements(self, obj):
        completed_announcements = obj.users_announcement.filter(
            completed=True
        )[:3]
        return AnnouncementSerializer(completed_announcements, many=True).data

    def get_homes_found_number(self, obj):
        return obj.users_announcement.filter(
            completed=True,
            category__name=LOOKING_HOME,
        ).count()

    def get_pets_found_number(self, obj):
        return obj.users_announcement.filter(
            completed=True,
            category__name=LOST_FOUND,
        ).count()

    def get_co_curator_announcements(self, obj):
        co_curator_announcements = obj.curators_announcement.filter(
            co_curator=obj.id
        )[:3]
        return AnnouncementSerializer(co_curator_announcements, many=True).data


class PasswordChangeSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(required=False)
    new_password = serializers.CharField(required=False)
    re_password = serializers.CharField(required=False)

    class Meta:
        model = ZooUser
        fields = (
            'current_password',
            'new_password',
            're_password',
        )

    def validate(self, attrs):
        user = self.context['request'].user
        current_password = attrs.get('current_password')
        if current_password and not user.check_password(current_password):
            raise serializers.ValidationError(
                "Вы ввели неверный текущий пароль."
            )
        new_password = attrs.get('new_password')
        re_password = attrs.get('re_password')
        if new_password and new_password != re_password:
            raise serializers.ValidationError("Пароли не совпадают.")
        if new_password and new_password == current_password:
            raise serializers.ValidationError(
                "Вы уже используете этот пароль."
            )
        if new_password:
            validate_password(new_password)
        return attrs

    def update(self, instance, validated_data):
        new_password = validated_data.get('new_password')
        if new_password:
            instance.set_password(new_password)
            update_session_auth_hash(self.context['request'], instance)
        instance.save()
        return instance
