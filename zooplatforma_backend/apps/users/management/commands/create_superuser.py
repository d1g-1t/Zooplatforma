from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
import os
import logging

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Создаёт суперпользователя, используя данные из переменных окружения'

    def handle(self, *args, **options):
        User = get_user_model()

        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(
                self.style.WARNING(
                    'Суперпользователь уже существует, создание пропущено.'
                )
            )
            return

        try:
            email = os.environ.get('SUPERUSER_EMAIL')
            password = os.environ.get('SUPERUSER_PASSWORD')
            phone = os.environ.get('SUPERUSER_PHONE')
            first_name = os.environ.get('SUPERUSER_FIRST_NAME')

            if not all([email, password, phone, first_name]):
                error_message = (
                    'Отсутствуют необходимые переменные окружения. '
                    'Заполните SUPERUSER_EMAIL, SUPERUSER_PASSWORD, '
                    'SUPERUSER_PHONE, SUPERUSER_FIRST_NAME.'
                )
                self.stdout.write(self.style.ERROR(error_message))
                logger.error(error_message)
                return

            user = User.objects.create_superuser(
                email=email,
                password=password,
                phone=phone,
                first_name=first_name,
                is_active=True,
                is_staff=True,
                is_superuser=True
            )

            self.stdout.write(f"Создан пользователь с email: {user.email}")
            self.stdout.write(f"Статус суперпользователя: {user.is_superuser}")
            self.stdout.write(f"Статус сотрудника: {user.is_staff}")
            self.stdout.write(f"Аккаунт активен: {user.is_active}")

            success_message = (
                f'Суперпользователь с email "{email}" успешно создан.')
            self.stdout.write(self.style.SUCCESS(success_message))
            logger.info(success_message)

        except Exception as e:
            error_message = f'Ошибка при создании суперпользователя: {str(e)}'
            self.stdout.write(self.style.ERROR(error_message))
            logger.error(error_message)
            raise
