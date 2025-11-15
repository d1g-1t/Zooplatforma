from django.contrib.auth import get_user_model
from django.db import models

from apps.announcements.constants import (
    LOOKING_HOME,
    MARKING_TYPE_CHOICES,
    MAX_CATEGORY_NAME_LENGTH,
)

User = get_user_model()


class Category(models.Model):
    """Модель категории объявления."""

    name = models.CharField(
        "Категория",
        choices=MARKING_TYPE_CHOICES,
        default=LOOKING_HOME,
        unique=True,
        max_length=MAX_CATEGORY_NAME_LENGTH,
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"
