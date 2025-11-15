from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from api.v1.serializers.zoobase import ZoobaseSerializer
from apps.pets.models import Pet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters


class ZoobaseViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all()
    serializer_class = ZoobaseSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['type', 'breed', 'gender', 'color']
    search_fields = ['name', 'diagnosis']
    ordering_fields = ['date_of_birth']

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
        except ValidationError as e:
            error_messages = self._get_error_messages(e.detail)
            return Response(
                {
                    "success": False,
                    "message": error_messages,
                },
                status=status.HTTP_400_BAD_REQUEST
            )
        headers = self.get_success_headers(serializer.data)
        return Response(
            {
                "success": True,
                "message": "Питомец успешно создан.",
                "data": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def _get_error_messages(self, errors):
        messages = []

        def extract_messages(err_dict):
            for key, value in err_dict.items():
                if isinstance(value, list):
                    for item in value:
                        if isinstance(item, dict):
                            extract_messages(item)
                        else:
                            messages.append(str(item))
                elif isinstance(value, dict):
                    extract_messages(value)
                else:
                    messages.append(str(value))

        extract_messages(errors)
        return ", ".join(messages)