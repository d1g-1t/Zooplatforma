from drf_spectacular.utils import extend_schema
from rest_framework import viewsets

from api.v1.serializers.categories import CategorySerializer
from apps.announcements.models import Category


@extend_schema(tags=["Category"])
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
