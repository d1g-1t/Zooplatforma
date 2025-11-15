from rest_framework import serializers
from apps.pets.models import Vaccination

class VaccinationSerializer(serializers.ModelSerializer):
    date_vaccination = serializers.DateField(input_formats=['%d-%m-%Y'])

    class Meta:
        model = Vaccination
        fields = ['type', 'medicament', 'date_vaccination']