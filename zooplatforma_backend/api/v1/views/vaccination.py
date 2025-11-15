from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from api.v1.serializers.vaccination import VaccinationSerializer
from apps.pets.models import Vaccination


@extend_schema(tags=["Treatments"])
class VaccinationViewSet(viewsets.ModelViewSet):
    queryset = Vaccination.objects.all().select_related("pet", "type", "medicament")
    serializer_class = VaccinationSerializer
