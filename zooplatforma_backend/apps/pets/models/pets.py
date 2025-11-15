from django.db import models

from apps.pets.consts import (
    MAX_LENGTH_COLOR,
    MAX_LENGTH_BREED,
    MAX_LENGTH_NAME,
    MAX_LENGTH_TYPE,
    MAX_GENDER_LENGTH,
)


class Pet(models.Model):
    """Модель питомца."""

    name = models.CharField(
        "Кличка",
        max_length=MAX_LENGTH_NAME
    )
    type = models.CharField(
        "Вид питомца",
        max_length=MAX_LENGTH_TYPE
    )
    gender = models.CharField(
        "Пол",
        max_length=MAX_GENDER_LENGTH
    )
    breed = models.CharField(
        "Порода",
        max_length=MAX_LENGTH_BREED
    )
    color = models.CharField(
        "Масть",
        max_length=MAX_LENGTH_COLOR
    )
    date_of_birth = models.DateField(
        "Дата рождения",
        blank=True,
        null=True
    )
    date_birth_approx = models.BooleanField(
        "Примерная дата рождения да/нет",
        default=False
    )
    breeding_data = models.BooleanField(
        "Племенные данные",
        default=False
    )
    diagnosis = models.TextField(
        "Диагноз",
        blank=True,
        null=True
    )
    owners = models.ManyToManyField(
        'users.OwnerProfile',
        related_name='pets',
        blank=True
    )
    class Meta:
        verbose_name = "Питомец"
        verbose_name_plural = "Питомцы"
        ordering = ("name",)
        default_related_name = "pets"

    def __str__(self):
        return self.name
