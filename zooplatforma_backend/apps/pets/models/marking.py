from django.db import models

from apps.pets.consts import (
    MARKING_TYPE_CHOICES,
    MAX_LENGTH_MARKING,
)
from apps.pets.models import Pet


class PetMarking(models.Model):
    CHIP = 'CHIP'
    TAG = 'TAG'
    STAMP = 'STAMP'
    MARKING_TYPE_CHOICES = [
        (CHIP, 'Чип'),
        (TAG, 'Бирка'),
        (STAMP, 'Клеймо'),
    ]

    type = models.CharField(
        "Тип маркировки",
        choices=MARKING_TYPE_CHOICES,
        max_length=6,
        blank=True,
        null=True
    )
    number = models.CharField(
        "Номер маркировки",
        unique=True,
        max_length=MAX_LENGTH_MARKING
    )
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name="markings",
        verbose_name="Питомец"
    )
    type = models.CharField(
        "Тип маркировки",
        choices=MARKING_TYPE_CHOICES,
        max_length=5
    )
    number = models.CharField(
        "Номер маркировки",
        unique=True,
        max_length=50
    )
    is_verifed = models.BooleanField(
        "Верифицирован да/нет",
        default=False
    )

    class Meta:
        verbose_name = "Маркировка питомца"
        verbose_name_plural = "Маркировки питомцев"
        ordering = ("number",)
        constraints = (
            models.UniqueConstraint(
                fields=("pet", "type"),
                name="unique_pet_type",
            ),
        )

    def __str__(self):
        return self.number
