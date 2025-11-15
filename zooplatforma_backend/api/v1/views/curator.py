from drf_spectacular.utils import extend_schema
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from api.v1.serializers.curator import CuratorSerializer
from apps.users.models import Curator


@extend_schema(tags=["Curator"])
class CuratorViewSet(viewsets.ModelViewSet):
    queryset = Curator.objects.all().select_related("user")
    serializer_class = CuratorSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        send_curator_status_email.delay(instance.user.id)

        return Response(serializer.data)