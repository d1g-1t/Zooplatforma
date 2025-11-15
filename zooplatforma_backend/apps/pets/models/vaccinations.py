from django.db import models
from apps.pets.models import Pet
from apps.pets.consts import MAX_LENGTH_TREATMENT_TYPE, MAX_LENGTH_MEDICAMENT


class Vaccination(models.Model):
    """Модель вакцинации"""

    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        verbose_name="Питомец",
    )
    type = models.CharField(
        "Тип вакцинации",
        max_length=MAX_LENGTH_TREATMENT_TYPE
    )
    medicament = models.CharField(
        "Медикамент",
        max_length=MAX_LENGTH_MEDICAMENT
    )
    date_vaccination = models.DateField(
        "Дата вакцинации",
    )
    created_at = models.DateTimeField(
        "Дата и время создания",
        auto_now_add=True
    )

    class Meta:
        verbose_name = "Вакцинация"
        verbose_name_plural = "Вакцинации"
        ordering = ("date_vaccination",)
        default_related_name = "vaccinations"

    def __str__(self):
        return f"{self.pet.name} - {self.date_vaccination.strftime('%Y-%m-%d')}"