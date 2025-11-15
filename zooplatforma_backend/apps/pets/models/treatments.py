from django.db import models
from apps.pets.models import Pet
from apps.pets.models.base import AbstractModelWithCreatedField
from apps.pets.consts import MAX_LENGTH_TREATMENT_TYPE, MAX_LENGTH_MEDICAMENT


class Treatments(AbstractModelWithCreatedField):
    """Модель обработки питомцев."""

    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        verbose_name="Питомец",
    )
    type_treatment = models.CharField(
        "Тип обработки",
        max_length=MAX_LENGTH_TREATMENT_TYPE
    )
    medicament = models.CharField(
        "Медикамент",
        max_length=MAX_LENGTH_MEDICAMENT
    )
    date_treatment = models.DateField(
        "Дата обработки",
    )
    created_at = models.DateTimeField(
        "Дата и время создания",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Обработка"
        verbose_name_plural = "Обработки"
        ordering = ("date_treatment",)
        default_related_name = "treatments"

    def __str__(self):
        return f"{self.pet.name} - {self.created_at.strftime('%Y-%m-%d')}"