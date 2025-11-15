from datetime import datetime
from rest_framework import serializers
from apps.pets.models import Pet, PetPhoto, PetMarking, Treatments, Vaccination
from apps.pets.models.owner import PetOwner
from apps.users.models import ZooUser


class PetPhotoSerializer(serializers.ModelSerializer):
    photo = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = PetPhoto
        fields = ['photo', 'main_photo']


class PetMarkingSerializer(serializers.ModelSerializer):
    type = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = PetMarking
        fields = ['type', 'number']


class TreatmentsSerializer(serializers.ModelSerializer):
    date_treatment = serializers.DateField(
        input_formats=['%d-%m-%Y'],
        format='%d-%m-%Y'
    )

    class Meta:
        model = Treatments
        fields = ['type_treatment', 'medicament', 'date_treatment']


class VaccinationSerializer(serializers.ModelSerializer):
    date_vaccination = serializers.DateField(
        input_formats=['%d-%m-%Y'],
        format='%d-%m-%Y'
    )

    class Meta:
        model = Vaccination
        fields = ['type', 'medicament', 'date_vaccination']


class PetOwnerSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=ZooUser.objects.all(),
        required=False
    )
    document_issuance_date = serializers.DateField(
        input_formats=['%d-%m-%Y'],
        format='%d-%m-%Y'
    )

    class Meta:
        model = PetOwner
        fields = [
            "user",
            "is_legal_entity",
            "inn",
            "first_name",
            "last_name",
            "middle_name",
            "email",
            "phone",
            "address",
            "citizenship",
            "document_type",
            "document_series_number",
            "document_issuance_date",
        ]

    def create(self, validated_data):
        user = validated_data.pop('user', None)
        pet_owner = PetOwner.objects.create(user=user, **validated_data)
        return pet_owner


class ZoobaseSerializer(serializers.ModelSerializer):
    owners = PetOwnerSerializer(many=True)
    photos = PetPhotoSerializer(many=True, required=False)
    markings = PetMarkingSerializer(many=True, required=False)
    treatments = TreatmentsSerializer(many=True, required=False)
    vaccinations = VaccinationSerializer(many=True, required=False)
    date_of_birth = serializers.DateField(
        input_formats=['%d-%m-%Y'],
        format='%d-%m-%Y'
    )

    class Meta:
        model = Pet
        fields = [
            "name",
            "type",
            "breed",
            "gender",
            "date_of_birth",
            "color",
            "breeding_data",
            "diagnosis",
            "photos",
            "markings",
            "treatments",
            "vaccinations",
            "owners",
        ]

    def validate_photos(self, value):
        if len(value) > 1:
            raise serializers.ValidationError("Должна быть только одна фотография.")
        if len(value) == 1 and not value[0].get('main_photo'):
            raise serializers.ValidationError("Флаг main_photo должен быть установлен в True.")
        return value

    def create(self, validated_data):
        owners_data = validated_data.pop('owners', [])
        photos_data = validated_data.pop('photos', [])
        markings_data = validated_data.pop('markings', [])
        treatments_data = validated_data.pop('treatments', [])
        vaccinations_data = validated_data.pop('vaccinations', [])

        pet = Pet.objects.create(**validated_data)

        for owner_data in owners_data:
            PetOwner.objects.create(pet=pet, **owner_data)

        for treatment_data in treatments_data:
            Treatments.objects.create(pet=pet, **treatment_data)

        for vaccination_data in vaccinations_data:
            Vaccination.objects.create(pet=pet, **vaccination_data)

        for photo_data in photos_data:
            PetPhoto.objects.create(pet=pet, **photo_data)

        for marking_data in markings_data:
            PetMarking.objects.create(pet=pet, **marking_data)

        return pet