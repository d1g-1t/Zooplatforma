from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from api.v1.serializers.journals import (
    JournalSerializer,
    LikeOnJournalSerializer,
    JournalImageSerializer,
)
from apps.announcements.models import Journal, LikeOnJournal, JournalImage


@extend_schema(tags=["Journal"])
class JournalViewSet(viewsets.ModelViewSet):
    queryset = (
        Journal.objects.all()
        .select_related("announcement", "author")
        .prefetch_related("journal_likes", "journal_images")
    )
    serializer_class = JournalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


@extend_schema(tags=["Journal"])
class LikeOnJournalViewSet(viewsets.ModelViewSet):
    queryset = LikeOnJournal.objects.all().select_related("journal")
    serializer_class = LikeOnJournalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


@extend_schema(tags=["Journal"])
class JournalImageViewSet(viewsets.ModelViewSet):
    queryset = JournalImage.objects.all().select_related("journal")
    serializer_class = JournalImageSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
