from hashlib import md5

from django.conf import settings
from django.core.cache import cache
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema
from rest_framework import filters, status, viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from api.v1.serializers.announcements import AnnouncementSerializer
from apps.announcements.models import Announcement


@extend_schema(tags=['Announcement'])
class AnnouncementViewSet(viewsets.ModelViewSet):
    queryset = Announcement.objects.all().select_related(
        'author',
        'co_curator',
        'category'
        ).prefetch_related('announcement_images')
    serializer_class = AnnouncementSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    cache_namespace = 'announcements'
    cache_timeout = settings.CACHE_TTL
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter
        ]
    filterset_fields = ['category', 'immediately', 'completed', 'published']
    search_fields = ['title', 'description', 'address']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

    def _build_cache_key(self, payload: str) -> str:
        digest = md5(payload.encode('utf-8')).hexdigest()
        return f'{self.cache_namespace}:{digest}'

    def _invalidate_cache(self) -> None:
        pattern = f'{self.cache_namespace}:*'
        delete_pattern = getattr(cache, 'delete_pattern', None)
        if callable(delete_pattern):
            delete_pattern(pattern)
            return
        cache.clear()

    def list(self, request, *args, **kwargs):
        cache_key = self._build_cache_key(f'list:{request.get_full_path()}')
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)
        response = super().list(request, *args, **kwargs)
        cache.set(cache_key, response.data, self.cache_timeout)
        return response

    def retrieve(self, request, *args, **kwargs):
        cache_key = self._build_cache_key(f'retrieve:{kwargs.get("pk", "")}')
        cached = cache.get(cache_key)
        if cached is not None:
            return Response(cached)
        response = super().retrieve(request, *args, **kwargs)
        cache.set(cache_key, response.data, self.cache_timeout)
        return response

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        self._invalidate_cache()

    def perform_update(self, serializer):
        serializer.save()
        self._invalidate_cache()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response({
            "success": True,
            "message": "Запрос выполнен успешно",
            "announcement": serializer.data
        }, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(
            instance,
            data=request.data,
            partial=partial
            )
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({
            "success": True,
            "message": "Обновление выполнено успешно",
            "announcement": serializer.data
        })

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        self._invalidate_cache()
        return Response({
            "success": True,
            "message": "Удаление выполнено успешно"
        }, status=status.HTTP_204_NO_CONTENT)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
