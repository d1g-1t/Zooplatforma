from django.db import models

from apps.pets.consts import (
    MAX_LENGTH_NAME,
)


class AbstractModelOnlyCreatedField(models.Model):
    """
    Абстрактная модель с полем даты создания.

    Атрибуты:
        created_at: Дата создания объекта
    """

    created_at = models.DateTimeField("Дата и время создания", auto_now_add=True)

    class Meta:
        abstract = True


class AbstractModelWithCreatedField(AbstractModelOnlyCreatedField):
    """
    Абстрактная модель с полем названия.

    Атрибуты:
        name: Название объекта

    Методы:
        __str__: self.name - self.create_at

    """

    name = models.CharField("Название", max_length=MAX_LENGTH_NAME)

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.name} - {self.created_at.strftime('%Y-%m-%d')}"
