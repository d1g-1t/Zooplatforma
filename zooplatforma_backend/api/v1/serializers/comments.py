from rest_framework import serializers
from apps.announcements.models import Comment, LikeOnComment


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            "id",
            "announcement",
            "author",
            "created_at",
        ]


class LikeOnCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikeOnComment
        fields = ["id", "user", "comment", "created_at"]
        read_only_fields = ["id", "created_at"]

    def create(self, validated_data):
        user = self.context['request'].user
        comment = validated_data.get('comment')
        like, created = LikeOnComment.objects.get_or_create(user=user, comment=comment)
        if not created:
            raise serializers.ValidationError("Вы уже поставили лайк этому комментарию.")
        return like