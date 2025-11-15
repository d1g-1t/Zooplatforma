from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from drf_spectacular.utils import extend_schema

from api.v1.serializers.marking import PetMarkingSerializer
from apps.pets.models import PetMarking


@extend_schema(tags=["PetMarking"])
class PetMarkingViewSet(viewsets.ModelViewSet):
    queryset = PetMarking.objects.all()
    serializer_class = PetMarkingSerializer
    permission_classes = [IsAuthenticated]
