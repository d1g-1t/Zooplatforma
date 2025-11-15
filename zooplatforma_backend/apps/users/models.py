from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.core.validators import FileExtensionValidator
from django.db import models

from apps.pets.models.base import AbstractModelOnlyCreatedField
from apps.users.constants import MAX_STR_LENGTH, MAX_TEXT_LENGTH, MAX_PHONE_LENGTH
from apps.users.utils import (
    BirthValidator,
    FirstNameValidator,
    LastNameValidator,
    PhoneValidator,
    curator_directory_path,
    normalize_phone_number,
)


class ZooUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(
        self, email, phone, first_name, password, last_name=None, **extra_fields
    ):
        """
        Создает и сохраняет пользователя с введенным паролем email или phone.
        """
        email = self.normalize_email(email)
        user = self.model(
            email=email, phone=phone, first_name=first_name, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(
        self, email, phone, first_name, password, last_name=None, **extra_fields
    ):
        extra_fields.setdefault("is_superuser", False)
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_curator", False)
        return self._create_user(
            email=email,
            phone=phone,
            first_name=first_name,
            password=password,
            **extra_fields,
        )

    def create_superuser(
        self, email, phone, first_name, password, last_name=None, **extra_fields
    ):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_curator", False)
        return self._create_user(
            email=email,
            phone=phone,
            first_name=first_name,
            password=password,
            **extra_fields,
        )


class ZooUser(AbstractBaseUser, PermissionsMixin):
    """Кастомная модель пользователя."""

    is_active = models.BooleanField("Активный", default=True)
    email = models.EmailField("Почта", max_length=MAX_STR_LENGTH, unique=True)
    email_is_hidden = models.BooleanField("Скрыть почту", default=False)
    phone = models.CharField(
        "Телефон",
        unique=True,
        validators=[PhoneValidator()],
        max_length=MAX_PHONE_LENGTH,
    )
    phone_is_hidden = models.BooleanField("Скрыть телефон", default=False)
    password = models.CharField("Пароль", max_length=MAX_STR_LENGTH)
    first_name = models.CharField(
        "Имя", max_length=MAX_STR_LENGTH, validators=[FirstNameValidator]
    )
    last_name = models.CharField(
        "Фамилия",
        max_length=MAX_STR_LENGTH,
        blank=True,
        null=True,
        validators=[LastNameValidator],
    )
    date_birth = models.DateField(
        "День рождения", blank=True, null=True, validators=[BirthValidator]
    )
    address = models.CharField(
        "Адрес", max_length=MAX_STR_LENGTH, blank=True, null=True
    )
    is_curator = models.BooleanField("Куратор", default=False)
    about_me_title = models.CharField(
        "Заголовок описания", max_length=MAX_STR_LENGTH, blank=True, null=True
    )
    about_me_text = models.TextField(
        "Описание", max_length=MAX_TEXT_LENGTH, blank=True, null=True
    )
    is_staff = models.BooleanField("Модератор", default=False)
    avatar = models.ImageField(
        'Фото профиля',
        upload_to='avatars/',
        null=True,
        blank=True
    )

    objects = ZooUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone", "first_name"]

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"

    def save(self, *args, **kwargs):
        if self.last_name:
            self.last_name = self.last_name.capitalize()
        self.first_name = self.first_name.capitalize()
        self.phone = normalize_phone_number(self.phone)
        super(ZooUser, self).save(*args, **kwargs)


class Curator(AbstractModelOnlyCreatedField):
    user = models.ForeignKey(
        ZooUser,
        related_name="curator",
        on_delete=models.CASCADE
    )
    passport = models.ImageField(
        "Паспорт",
        upload_to=curator_directory_path,
        validators=[FileExtensionValidator(["jpg", "jpeg", "png"])],
    )
    contract = models.FileField(
        "Контракт",
        upload_to=curator_directory_path,
        validators=[
            FileExtensionValidator(["pdf", "doc", "docx", "txt", "odt", "sxg"])
        ],
    )
    is_moderated = models.BooleanField("Проведена проверка", default=False)

    class Meta:
        verbose_name = "Куратор"
        verbose_name_plural = "Кураторы"

    def __str__(self) -> str:
        return f"""Пользователь {self.user}:
        {'Проверен' if self.is_moderated else 'Не проверен'}
        Дата создания - {self.created_at}"""


class OwnerProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owner_profile')
    is_legal_entity = models.BooleanField("Владелец - юридическое лицо", default=False)
    inn = models.CharField("ИНН", max_length=12, blank=True, null=True)
    first_name = models.CharField("Имя", max_length=50)
    last_name = models.CharField("Фамилия", max_length=50)
    middle_name = models.CharField("Отчество", max_length=50, blank=True, null=True)
    email = models.EmailField("Email", blank=True, null=True)
    phone = models.CharField("Телефон", max_length=15)
    address = models.CharField("Адрес проживания", max_length=255)
    citizenship = models.CharField("Гражданство", max_length=50)
    document_type = models.CharField("Тип документа", max_length=50)
    document_series_number = models.CharField("Серия и номер документа", max_length=50)
    document_issuance_date = models.DateField("Дата выдачи документа")

    def __str__(self):
        return f"{self.first_name} {self.last_name}"