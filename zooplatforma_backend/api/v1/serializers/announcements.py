from django.contrib.auth import get_user_model
from rest_framework import serializers

from apps.announcements.models import Announcement, AnnouncementImage

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class AnnouncementImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnnouncementImage
        fields = ['id', 'image', 'main_photo', 'created_at']
        read_only_fields = ['id', 'created_at']


class AnnouncementSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    co_curator = UserSerializer(read_only=True)
    co_curator_phone = serializers.CharField(
        required=False,
        allow_blank=True,
        allow_null=True,
        write_only=True,
    )
    images = serializers.ListField(
        child=serializers.ImageField(),
        required=False,
        allow_empty=True,
        write_only=True,
    )
    announcement_images = AnnouncementImageSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Announcement
        fields = [
            'id',
            'category',
            'author',
            'title',
            'description',
            'pet',
            'pet_name',
            'species',
            'gender',
            'breed',
            'color',
            'address',
            'residence_place',
            'co_curator',
            'co_curator_phone',
            'required_amount',
            'announcement_images',
            'images',
        ]
        read_only_fields = ['id', 'author', 'co_curator']

    def _attach_images(self, announcement: Announcement, images: list) -> None:
        for image in images:
            AnnouncementImage.objects.create(announcement=announcement, image=image)

    def _resolve_co_curator(self, phone: str | None):
        if not phone:
            return None
        return User.objects.filter(phone=phone).first()

    def create(self, validated_data):
        images = validated_data.pop('images', [])
        co_curator_phone = validated_data.pop('co_curator_phone', None)
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            validated_data['author'] = request.user
        co_curator_user = self._resolve_co_curator(co_curator_phone)
        if co_curator_user:
            validated_data['co_curator'] = co_curator_user
        announcement = super().create(validated_data)
        if images:
            self._attach_images(announcement, images)
        return announcement

    def update(self, instance, validated_data):
        images = validated_data.pop('images', [])
        co_curator_phone = validated_data.pop('co_curator_phone', None)
        co_curator_user = self._resolve_co_curator(co_curator_phone)
        if co_curator_user:
            validated_data['co_curator'] = co_curator_user
        announcement = super().update(instance, validated_data)
        if images:
            self._attach_images(announcement, images)
        return announcement
