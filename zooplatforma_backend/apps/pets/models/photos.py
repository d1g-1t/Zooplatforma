from django.db import models
from django.db.models import UniqueConstraint, Q

from apps.pets.models import Pet


class PetPhoto(models.Model):
    """Модель фото питомца."""

    pet = models.ForeignKey(
        Pet, on_delete=models.CASCADE, related_name="photos", verbose_name="Питомец"
    )
    photo = models.ImageField("Фото питомца", blank=True, null=True)
    main_photo = models.BooleanField("Главное фото да/нет", default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['pet'], condition=models.Q(main_photo=True), name='unique_main_photo_per_pet'
            )
        ]

    def __str__(self):
        return f"Фото питомца {self.pet.name}"
