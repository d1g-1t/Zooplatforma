from rest_framework import serializers
from apps.pets.models import Treatments

class TreatmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Treatments
        fields = [
            "id",
            "pet",
            "type_treatment",
            "medicament",
            "date_treatment",
            "created_at",
        ]

    def create(self, validated_data):
        return Treatments.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.type_treatment = validated_data.get('type_treatment', instance.type_treatment)
        instance.medicament = validated_data.get('medicament', instance.medicament)
        instance.date_treatment = validated_data.get('date_treatment', instance.date_treatment)
        instance.save()
        return instance