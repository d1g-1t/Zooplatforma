from rest_framework import serializers
from apps.announcements.models import Media


class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = [
            "id",
            "image_main",
            "image_1080px",
            "image_720px",
            "image_360px",
            "announcement",
            "name",
        ]
        read_only_fields = ["name"]

    def create(self, validated_data):
        media = Media.objects.create(**validated_data)
        media.name = media.image_main.name 
        media.save()
        return media

    def update(self, instance, validated_data):
        instance.image_main = validated_data.get('image_main', instance.image_main)
        instance.image_1080px = validated_data.get('image_1080px', instance.image_1080px)
        instance.image_720px = validated_data.get('image_720px', instance.image_720px)
        instance.image_360px = validated_data.get('image_360px', instance.image_360px)
        instance.announcement = validated_data.get('announcement', instance.announcement)
        if 'image_main' in validated_data:
            instance.name = instance.image_main.name
        instance.save()
        return instance