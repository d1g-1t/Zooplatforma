from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.serializers.medias import MediaSerializer
from apps.announcements.models import Media


@extend_schema(tags=["PetMarking"])
class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all().select_related("announcement")
    serializer_class = MediaSerializer
    permission_classes = [IsAuthenticated]
