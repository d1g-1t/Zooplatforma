from rest_framework import serializers
from apps.announcements.models import Journal, LikeOnJournal, JournalImage


from rest_framework import serializers
from apps.announcements.models import Journal, LikeOnJournal


class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = [
            "id",
            "author",
            "created_at",
        ]


class LikeOnJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeOnJournal
        fields = ["id", "user", "journal", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        journal = validated_data.get('journal')
        like, created = LikeOnJournal.objects.get_or_create(user=user, journal=journal)
        if not created:
            raise serializers.ValidationError("Вы уже поставили лайк этому журналу.")
        return like


class JournalImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalImage
        fields = [
            "id",
            "image",
            "journal",
        ]
