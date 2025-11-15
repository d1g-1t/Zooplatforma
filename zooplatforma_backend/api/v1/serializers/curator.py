from rest_framework import serializers
from apps.users.models import Curator


class CuratorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curator
        fields = "__all__"
