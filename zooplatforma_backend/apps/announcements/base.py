from apps.pets.models.base import AbstractModelOnlyCreatedField
from django.contrib.auth import get_user_model
from django.db import models


class BaseLike(AbstractModelOnlyCreatedField):
    """Абстрактня модель лайка."""

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    class Meta:
        abstract = True
        ordering = ("created_at",)

    def __str__(self):
        return f"{self.user} - {self.created_at}"


class BaseImage(AbstractModelOnlyCreatedField):
    """Абстрактная модель изображения."""

    class Meta:
        abstract = True
        verbose_name = "Изображение"
        verbose_name_plural = "Изображения"
        ordering = ("created_at",)
