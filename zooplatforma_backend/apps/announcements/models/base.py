from django.contrib.auth import get_user_model
from django.db import models


User = get_user_model()


class AbstractModelCreatedField(models.Model):
    """
    Абстрактная модель с полем даты создания.

    Атрибуты:
        created_at: Дата создания объекта
    """

    created_at = models.DateTimeField("Дата и время создания", auto_now_add=True)


class AbstractModelAuthorTextCreatedFields(AbstractModelCreatedField):
    """
    Абстрактная модель с полями author и text. Наследуется от
    абстрактной модели с датой создания

    Атрибуты:
        author: Автор объекта
        text: Текст объекта

    Методы:
        __str__: self.text[10:] - self.create_at

    """

    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        on_delete=models.CASCADE,
    )
    text = models.TextField("Текст")

    class Meta:
        abstract = True

    def __str__(self):
        return f"{self.text[10:]}... - {self.created_at.strftime('%Y-%m-%d')}"
