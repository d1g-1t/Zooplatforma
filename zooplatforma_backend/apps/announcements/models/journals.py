from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models

from apps.announcements.base import BaseLike, BaseImage
from apps.announcements.constants import (
    MAX_TEXT_LENGTH,
)
from apps.announcements.models import Announcement
from apps.pets.models.base import (
    AbstractModelWithCreatedField,
)

User = get_user_model()


class Journal(AbstractModelWithCreatedField):
    """Модель журнала."""

    announcement = models.ForeignKey(
        Announcement,
        verbose_name="Объявление",
        on_delete=models.CASCADE,
        related_name="announcements_journal",
    )
    author = models.ForeignKey(
        User,
        verbose_name="Автор записи",
        on_delete=models.CASCADE,
        related_name="users_journal",
    )
    text = models.TextField(
        "Описание",
        max_length=MAX_TEXT_LENGTH,
        help_text="Подробно опишите возникшую ситуацию",
    )

    class Meta:
        verbose_name = "Журнал"
        verbose_name_plural = "Журналы"
        ordering = ("created_at",)

    def __str__(self) -> str:
        return f"{self.author} - {self.created_at}"


class LikeOnJournal(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='likes_on_journals'
    )
    journal = models.ForeignKey(
        Journal,
        on_delete=models.CASCADE,
        related_name='journal_likes'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'journal')

    def __str__(self):
        return f"{self.user} likes {self.journal}"


class JournalImage(BaseImage):
    """Модель изображения в журнале."""

    image = models.ImageField(
        "Фото журнала",
        upload_to="journal_images",
        validators=[FileExtensionValidator(["jpg", "png", "gif"])],
    )
    journal = models.ForeignKey(
        Journal,
        verbose_name="Изображение журнале",
        on_delete=models.CASCADE,
        related_name="journal_image",
    )

    def __str__(self):
        return f"{self.journal} - {self.image}"
