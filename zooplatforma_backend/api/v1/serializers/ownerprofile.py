from rest_framework import serializers
from apps.users.models import OwnerProfile
from django.contrib.auth import get_user_model
from datetime import datetime


User = get_user_model()


class OwnerProfileSerializer(serializers.ModelSerializer):
    document_issuance_date = serializers.CharField(required=True)

    class Meta:
        model = OwnerProfile
        fields = [
            'first_name',
            'last_name',
            'middle_name',
            'email',
            'phone',
            'address',
            'citizenship',
            'document_type',
            'document_series_number',
            'document_issuance_date',
        ]

    def validate_document_issuance_date(self, value):
        try:
            datetime.strptime(value, '%d.%m.%Y')
        except ValueError:
            raise serializers.ValidationError("Дата должна быть в формате DD.MM.YYYY.")
        return value

    def create(self, validated_data):
        date_str = validated_data.pop('document_issuance_date')
        validated_data['document_issuance_date'] = datetime.strptime(date_str, '%d.%m.%Y').date()
        return OwnerProfile.objects.create(**validated_data)

    def update(self, instance, validated_data):
        if 'document_issuance_date' in validated_data:
            date_str = validated_data.pop('document_issuance_date')
            validated_data['document_issuance_date'] = datetime.strptime(date_str, '%d.%m.%Y').date()
        return super().update(instance, validated_data)
