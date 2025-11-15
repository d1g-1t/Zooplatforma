from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from api.v1.serializers.ownerprofile import OwnerProfileSerializer
from apps.users.models import OwnerProfile


class OwnerProfileViewSet(viewsets.ModelViewSet):
    queryset = OwnerProfile.objects.all()
    serializer_class = OwnerProfileSerializer
    permission_classes = [IsAuthenticated]
