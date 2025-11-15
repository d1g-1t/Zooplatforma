from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.serializers.pet import PetSerializer, PetPhotoSerializer
from apps.pets.models import Pet, PetPhoto


@extend_schema(tags=["Pet"])
class PetViewSet(viewsets.ModelViewSet):
    queryset = (
        Pet.objects.all()
        .select_related("type")
        .prefetch_related("photos", "vaccinations")
    )
    serializer_class = PetSerializer
    permission_classes = [IsAuthenticated]


@extend_schema(tags=["Pet"])
class PetPhotoViewSet(viewsets.ModelViewSet):
    queryset = PetPhoto.objects.all()
    serializer_class = PetPhotoSerializer
    permission_classes = [IsAuthenticated]
