# Zooplatforma

Платформа для помощи животным, объединяющая приюты, волонтёров и благотворительные организации.

## Стек

- **Backend:** Python 3.12, Django 5, DRF, Celery, PostgreSQL, Redis
- **Frontend:** React 18, Vite, TypeScript, SCSS
- **Инфраструктура:** Docker, docker compose, Makefile, Nginx, Gunicorn

## Быстрый запуск

1. Создайте файл `zooplatforma_backend/.env` (команда `make ensure-env` автоматически скопирует `zooplatforma_backend/.env.example`, после чего можно отредактировать значения при необходимости).
2. Выполните демонстрационный запуск одной командой:

```bash
make demo
```

Команда соберёт образы, применит миграции и запустит все сервисы в foreground-режиме. Остановить сервисы можно сочетанием `Ctrl+C`.

**Или запустите в фоновом режиме:**

```bash
make up
```

**Проверка работоспособности:**

```bash
make test-stack
```

Эта команда запустит стек и выполнит базовые проверки доступности сервисов.

## Ежедневные команды Makefile

```bash
make build       # пересобрать образы
make up          # запустить стек в фоне
make down        # остановить и очистить контейнеры
make logs        # посмотреть логи
make restart     # перезапустить стек
make test-stack  # запустить и протестировать все сервисы
```

## Точки доступа

- Backend: http://localhost:8000
- Frontend (статическая сборка): http://localhost:8080
- API: http://localhost:8000/api/v1/

## Тесты

```bash
cd zooplatforma_backend && poetry run pytest
cd ../zooplatforma_frontend && npm test
```
