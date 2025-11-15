from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from django.db import models
from django.core.validators import MaxValueValidator

from apps.announcements.base import BaseImage
from apps.announcements.constants import (
    HOME,
    NEW_PET,
    MAX_ADRESS_LENGTH,
    MAX_TEXT_LENGTH,
    MAX_TITLE_LENGTH,
    RESIDENCE_PLACE,
    PET_CHOICES,
    GENDER_CHOICES,
    MAX_RESIDENCE_PLACE_LENGTH,
)
from apps.announcements.models.categories import Category
from apps.pets.models.base import AbstractModelWithCreatedField


User = get_user_model()


class Announcement(AbstractModelWithCreatedField):
    """Модель объявления."""

    author = models.ForeignKey(
        User,
        verbose_name="Автор объявления",
        on_delete=models.CASCADE,
        related_name="users_announcement",
    )
    category = models.ForeignKey(
        Category,
        verbose_name="Категория",
        on_delete=models.CASCADE,
        related_name="announcements",
    )
    co_curator = models.ForeignKey(
        User,
        verbose_name="Сокуратор объявления",
        on_delete=models.SET_NULL,
        related_name="curators_announcement",
        null=True,
        blank=True,
        help_text="Выберите второго куратора по данному объявлению",
    )
    title = models.CharField(
        "Название объявления",
        max_length=MAX_TITLE_LENGTH,
        help_text="""Не используйте в названии
        Caps Lock, а также слово "Срочно"...""",
    )
    description = models.TextField(
        "Описание",
        max_length=MAX_TEXT_LENGTH,
        help_text="Подробно опишите возникшую ситуацию",
    )
    pet = models.CharField(
        max_length=20,
        choices=PET_CHOICES,
        default=NEW_PET
    )
    pet_name = models.CharField(
        max_length=50,
        null=True,
        blank=True
    )
    gender = models.CharField(
        max_length=20,
        choices=GENDER_CHOICES,
        default='Самец'
    )
    breed = models.CharField(
        "Порода",
        max_length=50,
        null=True,
        blank=True
    )
    species = models.CharField(
        "Вид",
        max_length=50,
        null=True,
        blank=True
    )
    color = models.CharField(
        "Масть",
        max_length=50,
        null=True,
        blank=True
    )
    address = models.CharField("Город", max_length=MAX_ADRESS_LENGTH)
    residence_place = models.CharField(
        "Место содержания",
        choices=RESIDENCE_PLACE,
        default=HOME,
        max_length=MAX_RESIDENCE_PLACE_LENGTH,
    )
    required_amount = models.IntegerField(
        "Необходимая сумма",
        default=0,
        validators=[MaxValueValidator(100000)]
    )
    immediately = models.BooleanField("Срочное: да/нет", default=False)
    completed = models.BooleanField("Завершено: да/нет", default=False)
    published = models.BooleanField("Опубликовано: да/нет", default=False)
    pet_with_me = models.BooleanField(
        "Питомец у автора: да/нет",
        default=False
    )

    def get_comments_count(self):
        return self.comments.count()

    class Meta:
        verbose_name = "Объявление"
        verbose_name_plural = "Объявления"
        ordering = ("created_at",)

    def __str__(self) -> str:
        return f"Автор: {self.author} - {self.title[:20]}"


class AnnouncementImage(BaseImage):
    """Модель изображения в объявлении."""

    image = models.ImageField(
        "Фото объявления",
        upload_to="announcement_images",
        validators=[FileExtensionValidator(["jpg", "png", "gif"])],
        null=True,
        blank=True
    )
    announcement = models.ForeignKey(
        Announcement,
        verbose_name="Изображение объявления",
        on_delete=models.CASCADE,
        related_name="announcement_images",
    )
    main_photo = models.BooleanField("Главное фото", default=False)

    def __str__(self):
        return f"{self.announcement.title} - {self.image.name}"
