from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.v1.serializers.comments import CommentSerializer, LikeOnCommentSerializer
from apps.announcements.models import Comment, LikeOnComment


@extend_schema(tags=["Comment"])
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().select_related("announcement", "author").prefetch_related("comment_likes")
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


@extend_schema(tags=["Comment"])
class LikeOnCommentViewSet(viewsets.ModelViewSet):
    queryset = LikeOnComment.objects.all().select_related("user", "comment")
    serializer_class = LikeOnCommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return LikeOnComment.objects.filter(user=self.request.user)