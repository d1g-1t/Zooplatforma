import re
import uuid

from datetime import datetime as dt
from django.conf import settings
from pathlib import Path
from typing import TYPE_CHECKING, Union
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError
from django.urls import reverse
from django.utils.deconstruct import deconstructible
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode

from apps.users.constants import (
    DAYS_IN_YEAR,
    MAX_AGE,
    REGULAR_NAME_VALUE,
    REGULAR_PHONE_VALUE,
)

if TYPE_CHECKING:
    from apps.users.models import Curator


@deconstructible
class PhoneValidator:
    """
    Кастомный валидатор номера телефона.

    Этот валидатор проверяет что номер телефона состоит из 11 цифр
    и начинается с 7.
    """

    def __call__(self, phone: str) -> None:
        """
        Основной метод, который выполняет проверку значения.

        Валидирует номер телефона.

        Args:
            phone (str): Номер телефона.
        Raises:
            ValidationError: Если занчение не удовлетворяет требованиям.
        """
        if not re.match(REGULAR_PHONE_VALUE, phone):
            raise ValidationError(
                """Номер телефона должен содержать только цифры,
                быть длинною 11 цифр и начинаться с 7."""
            )


@deconstructible
class FirstNameValidator:
    """
    Кастомный валидатор имени пользователя.

    Этот валидатор проверяет что имя содержит буквы
    английского или русского алфавитов и знак "-".
    """

    error_msg = """Имя может содержать только русские
        или английские буквы и символ "-"!"""

    def __call__(self, name: str) -> None:
        """
        Основной метод, который выполняет проверку имени.

        Валидирует имя пользователя, проверяет на
        отсутствие нежелательных символов.

        Args:
            name (str | None): Имя или фамилия.

        Raises:
            ValidationError: Если значение не удовлетворяет требованиям.
        """
        if not re.match(REGULAR_NAME_VALUE, name):
            raise ValidationError(self.error_msg)


@deconstructible
class LastNameValidator(FirstNameValidator):
    """
    Кастомный валидатор фамилии пользователя.

    Этот валидатор проверяет что фамилия содержит буквы
    английского или русского алфавитов и знак "-".
    """

    error_msg = """Фамилия может содержать только русские
        или английские буквы и символ "-"!"""

    def __call__(self, name: Union[str, None]) -> None:
        """
        Основной метод, который выполняет проверку фамилии.

        Валидирует фамилию пользователя, проверяет на
        отсутствие нежелательных символов.

        Args:
            name (str | None): Фамилия.

        Raises:
            ValidationError: Если значение не удовлетворяет требованиям.
        """
        if not name:
            raise ValidationError("Укажите фамилию!")
        super().__call__(name)


@deconstructible
class BirthValidator:
    """
    Кастомный валидатор дня рождения.

    Этот валидатор проверяет что день рождения не указан в будущем и что
    пользователь не старше 100 лет.
    """

    def __call__(self, date_birth: Union[dt.date, None]) -> None:
        """
        Основной метод, который выполняет проверку значения.

        Проверяет указана ли верно дата рождения, вызывается ValidationError,
        если дата рождения указана в будущем или если возраст более 100 лет.

        Args:
            date_birth (dt.date | None): Дата рождения.

        Raises:
            ValidationError: Если занчение не удовлетворяет требованиям.
        """
        if not date_birth:
            return
        age = (dt.today().date() - date_birth).days // DAYS_IN_YEAR
        hundred_years_ago_date = (dt.today().replace(year=dt.today().year - 100)).date()
        if date_birth > dt.today().date():
            raise ValidationError("Нельзя указать дату рождения в будущем!")
        elif age > MAX_AGE:
            raise ValidationError(
                f"Нельзя указать дату рождения позднее {hundred_years_ago_date}"
            )


def normalize_phone_number(phone: str) -> str:
    """
    Приводит номер телефона к правильному виду.

    Args:
        phone (str): Номер телефона.

    Returns:
        phone (str): Возвращает строку с номером телефона
        в формате 79995556677.
    """
    phone = re.sub(r"\D", "", phone)
    if phone[0] == "8":
        phone = "7" + phone[1:]
    return phone


def curator_directory_path(instance: "Curator", file_name: str) -> Path:
    """
    Создает путь до файла договора или фотографии паспорта.

    Возвращает путь для сохранения файла договора или фотографии паспорта,
    которые загружаются куратором в папку MEDIA_ROOT/curator_id_<id>/<filename>.
    Также заменяет имя на уникальную строку,
    например, "24e4ca97-00c6-4fb4-ab66-75e4a5a9bb38"

    Args:
        instance (str): Экземпляр модели.
        file_name (str): Имя загружаемого файла.

    Returns:
        path (Path): Возвращает объект Path с путем загрузки документа
        в формате curator_id_<id>/<filename>.
    """
    extension = file_name.split(".")[-1]
    file_name = f"{str(uuid.uuid4())}.{extension}"
    return Path(f"curator_id_{instance.user.id}/{file_name}")


def generate_activation_link(user, domain):
    User = get_user_model()
    token = default_token_generator.make_token(user)
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    path = reverse(
        'activate-account',
        kwargs={
            'uidb64': uid,
            'token': token
        }
    )
    activation_link = f"https://{domain}{path}"
    return activation_link


def generate_password_reset_link(user):
    """
    Генерирует ссылку для сброса пароля пользователя.

    Этот метод создает уникальный токен для пользователя и формирует полный URL
    для страницы подтверждения сброса пароля. Ссылка включает в себя идентификатор
    пользователя и токен, необходимые для верификации запроса на сброс пароля.

    Args:
        user (User): Экземпляр модели пользователя, для которого необходимо
                     сгенерировать ссылку для сброса пароля.

    Returns:
        str: Полный URL для подтверждения сброса пароля пользователя.

    Raises:
        django.core.exceptions.ValidationError: Если переданный пользователь не валиден.
        django.urls.exceptions.NoReverseMatch: Если имя URL-шаблона 'password-reset-confirm'
                                               не найдено или переданы некорректные параметры.
        AttributeError: Если у пользователя отсутствует атрибут 'pk'.
    """
    # Генерация уникального токена для сброса пароля пользователя
    token = default_token_generator.make_token(user)
    
    # Формирование пути URL для подтверждения сброса пароля с использованием
    # имени URL-шаблона 'password-reset-confirm' и передачи необходимых параметров
    path = reverse(
        'password-reset-confirm',
        kwargs={
            'uid': user.pk,    # Уникальный идентификатор пользователя
            'token': token     # Сгенерированный токен для сброса пароля
        }
    )
    
    # Конкатенация домена проекта с путем для получения полного URL
    reset_link = f"https://{settings.DOMAIN}{path}"
    
    return reset_link
