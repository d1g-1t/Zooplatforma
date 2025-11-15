from django.db import models
from apps.announcements.models.base import AbstractModelCreatedField
from apps.announcements.constants import MAX_IMAGE_NAME_LENGTH


class Media(AbstractModelCreatedField):
    image_main = models.ImageField(upload_to="images/")
    image_1080px = models.ImageField(upload_to="images/1080/", null=True, blank=True)
    image_720px = models.ImageField(upload_to="images/720/", null=True, blank=True)
    image_360px = models.ImageField(upload_to="images/360/", null=True, blank=True)
    announcement = models.ForeignKey(
        "Announcement",
        on_delete=models.CASCADE,
        related_name="media",
    )
    name = models.CharField(
        blank=True,
        null=True,
        editable=False,
        max_length=MAX_IMAGE_NAME_LENGTH
    )

    class Meta:
        verbose_name = "изображение"
        verbose_name_plural = "изображения"

    def __str__(self):
        return f"{self.name if self.name else 'Без имени'} - {self.announcement.title}"