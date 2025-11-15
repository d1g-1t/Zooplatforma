from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from api.v1.serializers.treatments import TreatmentsSerializer
from apps.pets.models import Treatments


@extend_schema(tags=["Treatments"])
class TreatmentsViewSet(viewsets.ModelViewSet):
    queryset = Treatments.objects.all().select_related(
        "pet", "type_treatment", "medicament"
    )
    serializer_class = TreatmentsSerializer
