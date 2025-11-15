from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.users.models import ZooUser
from api.v1.permissions import IsCurrentUserOrAdminOrReadOnly
from api.v1.serializers.user_profile import (
    PasswordChangeSerializer,
    ZooUserSerializer,
    )
from apps.pets.models.owner import PetOwner


class ZooUserViewSet(viewsets.ModelViewSet):
    queryset = ZooUser.objects.all()
    serializer_class = ZooUserSerializer
    permission_classes = (IsCurrentUserOrAdminOrReadOnly,)

    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({
                "success": True,
                "message": "Запрос выполнен успешно.",
                "data": serializer.data
            })
        except Http404:
            return Response({
                "success": False,
                "message": "Страница пользователя не найдена."
            }, status=status.HTTP_404_NOT_FOUND)

    @action(
        detail=False,
        methods=('get', 'put', 'patch', 'delete'),
        url_path='me',
        permission_classes=(IsAuthenticated,)
    )
    def manage_current_user(self, request):
        user = request.user
        if request.method == 'GET':
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        elif request.method in ('PUT', 'PATCH'):
            serializer = self.get_serializer(
                user,
                data=request.data,
                partial=(request.method == 'PATCH')
            )
            if serializer.is_valid():
                serializer.save()
                return Response({
                    "success": True,
                    "message": "Данные успешно изменены",
                    "data": serializer.data
                }, status=status.HTTP_200_OK)
            return Response(
                {
                    "success": False,
                    "message": serializer.errors,
                }, status=status.HTTP_400_BAD_REQUEST
            )
        elif request.method == 'DELETE':
            if (
                PetOwner.objects.filter(phone=user.phone).exists() or
                user.users_announcement.filter(published=True).exists() or
                user.curators_announcement.filter(co_curator=user.id).exists()
            ):
                confirm = request.data.get('confirm', False)
                if not confirm:
                    return Response(
                        {
                            "success": False,
                            "message": "Вы не можете удалить аккаунт, "
                            "так как у вас есть активные объявления, "
                            "вы являетесь сокуратором питомца или "
                            "владельцем опубликованного животного. "
                            "Вы хотите деактивировать ваш аккаунт?"
                        }, status=status.HTTP_400_BAD_REQUEST
                    )
                user.is_active = False
                user.save()
                return Response({
                    "success": True,
                    "message": "Аккаунт успешно деактивирован."
                }, status=status.HTTP_200_OK)

        confirm = request.data.get('confirm', False)
        if not confirm:
            return Response(
                {
                    "success": False,
                    "message": "Подтвердите удаление профиля."
                }, status=status.HTTP_400_BAD_REQUEST
            )

        user.delete()
        return Response(
            {
                "success": True,
                "message": "Профиль успешно удален."
            },
            status=status.HTTP_204_NO_CONTENT
        )

    @action(
            detail=False,
            methods=['put'],
            url_path='change_password',
            permission_classes=(IsAuthenticated,)
        )
    def change_password(self, request):
        serializer = PasswordChangeSerializer(
            data=request.data, context={'request': request}
        )
        if serializer.is_valid():
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response(
                {"success": True, "message": "Пароль успешно изменён."},
                status=status.HTTP_200_OK
                )

        return Response({
            "success": False,
            "message": serializer.errors.get('non_field_errors', [])
        }, status=status.HTTP_400_BAD_REQUEST)
