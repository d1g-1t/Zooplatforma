# Зооплатформа Backend

REST API для социальной платформы помощи животным с системой объявлений, управлением питомцами и ролевой моделью пользователей.

## Технологический стек

**Backend:** Python 3.12, Django 5.0.6, Django REST Framework 3.15.2  
**Database:** PostgreSQL 15, Redis 6  
**Auth:** JWT (simplejwt 5.3.1), Djoser 2.2.3  
**Queue:** Celery 5.4.0 + Redis  
**DevOps:** Docker, Docker Compose, Gunicorn 20.1.0, Nginx  
**Testing:** pytest 8.3.3, pytest-django 4.8.0  
**Code Quality:** pre-commit, ruff 0.5.0, flake8 7.1.1  
**Documentation:** drf-spectacular (OpenAPI/Swagger)

## Ключевые возможности

- JWT-аутентификация с token blacklist ротацией
- Кастомная User-модель с ролевым доступом (куратор/пользователь)
- Асинхронная обработка email-уведомлений через Celery
- Оптимизация запросов с select_related/prefetch_related
- Кеширование через Redis для ускорения чтения
- Система объявлений с со-кураторами и фильтрацией
- Автоматическая OpenAPI-документация
- Расширенная админ-панель с inline-формами

## Быстрый старт

### Запуск через Docker Compose

```bash
# Создать .env на основе шаблона
make ensure-env

# Запустить все сервисы (PostgreSQL, Redis, Django, Celery)
make up

# Создать суперпользователя
make superuser
```

API доступен по адресу: `http://localhost:8000`  
Документация: `http://localhost:8000/api/schema/swagger/`

### Локальная разработка с Poetry

```bash
# Установить зависимости
pip install poetry
poetry config virtualenvs.in-project true
poetry shell
poetry install --with dev

# Настроить pre-commit hooks
pre-commit install

# Запустить тесты
pytest
```

## Управление контейнерами (Makefile)

```bash
make up          # Запустить контейнеры
make down        # Остановить и удалить контейнеры
make superuser   # Создать суперпользователя
make pre-commit  # Запустить pre-commit hooks
make lock        # Обновить зависимости (poetry.lock)
```

## Архитектура

- **3 модульных приложения:** users, pets, announcements
- **15+ связанных моделей** с оптимизированными queryset'ами
- **Health checks** для всех сервисов в Docker
- **Автоматические миграции** при запуске контейнеров
- **Логирование** в файлы и консоль

## Работа с базой данных

### Подключение к PostgreSQL в контейнере

```bash
docker exec -it postgres_dev psql -U zoo_user -d zoo_project
```

### Полезные команды psql

```sql
\l                          -- список баз данных
\dt                         -- список таблиц
\d table_name               -- структура таблицы
DROP TABLE pets_pet CASCADE -- удалить таблицу с зависимостями
```

## Тестирование

Фикстуры организованы по уровням:
- Общие: `tests/conftest.py`
- Специфичные: `tests/{app_name}/conftest.py`

Файлы тестов: `test_*.py`
