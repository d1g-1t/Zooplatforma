from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from api.v1.serializers.owner import PetOwnerSerializer
from apps.pets.models.owner import PetOwner


@extend_schema(tags=["PetMarking"])
class PetOwnerViewSet(viewsets.ModelViewSet):
    queryset = PetOwner.objects.all().select_related("user", "pet")
    serializer_class = PetOwnerSerializer
