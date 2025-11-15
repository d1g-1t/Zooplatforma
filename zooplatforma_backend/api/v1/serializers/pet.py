from rest_framework import serializers
from apps.pets.models import Pet, PetPhoto
from api.v1.serializers.owner import PetOwnerSerializer
from api.v1.serializers.vaccination import VaccinationSerializer
from api.v1.serializers.treatments import TreatmentsSerializer
from api.v1.serializers.marking import PetMarkingSerializer
from apps.pets.models import Pet, PetPhoto, PetMarking, Treatments, Vaccination
from apps.pets.models.owner import PetOwner


class PetPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetPhoto
        fields = ['photo', 'main_photo']


class PetSerializer(serializers.ModelSerializer):
    photos = PetPhotoSerializer(many=True, required=False)
    markings = PetMarkingSerializer(many=True, required=False)
    treatments = TreatmentsSerializer(many=True, required=False)
    vaccinations = VaccinationSerializer(many=True, required=False)
    owners = PetOwnerSerializer(many=True)

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

    def create(self, validated_data):
        owners_data = validated_data.pop('owners', [])
        photos_data = validated_data.pop('photos', [])
        markings_data = validated_data.pop('markings', [])
        treatments_data = validated_data.pop('treatments', [])
        vaccinations_data = validated_data.pop('vaccinations', [])

        pet = Pet.objects.create(**validated_data)

        for owner_data in owners_data:
            PetOwner.objects.create(pet=pet, **owner_data)

        for photo_data in photos_data:
            PetPhoto.objects.create(pet=pet, **photo_data)

        for marking_data in markings_data:
            PetMarking.objects.create(pet=pet, **marking_data)

        for treatment_data in treatments_data:
            Treatments.objects.create(pet=pet, **treatment_data)

        for vaccination_data in vaccinations_data:
            Vaccination.objects.create(pet=pet, **vaccination_data)

        return pet

    def update(self, instance, validated_data):
        owners_data = validated_data.pop('owners', None)
        photos_data = validated_data.pop('photos', None)
        markings_data = validated_data.pop('markings', None)
        treatments_data = validated_data.pop('treatments', None)
        vaccinations_data = validated_data.pop('vaccinations', None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if owners_data is not None:
            instance.owners.all().delete()
            for owner_data in owners_data:
                PetOwner.objects.create(pet=instance, **owner_data)

        if photos_data is not None:
            instance.photos.all().delete()
            for photo_data in photos_data:
                PetPhoto.objects.create(pet=instance, **photo_data)

        if markings_data is not None:
            instance.markings.all().delete()
            for marking_data in markings_data:
                PetMarking.objects.create(pet=instance, **marking_data)

        if treatments_data is not None:
            instance.treatments.all().delete()
            for treatment_data in treatments_data:
                Treatments.objects.create(pet=instance, **treatment_data)

        if vaccinations_data is not None:
            instance.vaccinations.all().delete()
            for vaccination_data in vaccinations_data:
                Vaccination.objects.create(pet=instance, **vaccination_data)

        return instance
