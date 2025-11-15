from rest_framework import serializers
from apps.users.models import ZooUser
from apps.pets.models.owner import PetOwner


class PetOwnerSerializer(serializers.ModelSerializer):

    class Meta:
        model = PetOwner
        fields = [
            "pet",
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