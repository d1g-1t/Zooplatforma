from rest_framework import serializers
from apps.pets.models import PetMarking

class PetMarkingSerializer(serializers.ModelSerializer):
    type = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = PetMarking
        fields = ['type', 'number']