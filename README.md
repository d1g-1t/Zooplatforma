# Zooplatforma

Полнофункциональная веб-платформа для координации помощи бездомным животным. Реализует взаимодействие между приютами, волонтерами и потенциальными опекунами через систему объявлений, медицинских карт и профилей кураторов.

## Технологический стек

**Backend**  
Python 3.12 • Django 5.0 • Django REST Framework • PostgreSQL 15 • Redis 7 • Celery

**Frontend**  
React 18 • TypeScript • Vite • SCSS Modules

**Infrastructure**  
Docker Compose • Nginx • Makefile

## Быстрый старт

Требования: Docker 24.0+, Docker Compose, Make

```bash
git clone https://github.com/d1g-1t/Zooplatforma.git
cd Zooplatforma
make setup
```

Команда автоматически развернет контейнеры, выполнит миграции БД и создаст учетную запись администратора.

**Endpoints:**
- Frontend: http://localhost:8080
- REST API: http://localhost:8000/api/v1/
- Admin Panel: http://localhost:8000/admin

**Тестовые данные:** `admin@admin.ru` / `admin777`

## Команды

```bash
make up          # запустить
make down        # остановить
make restart     # перезапустить
make logs        # логи
make clean       # снести всё
```

## Структура

```
zooplatforma_backend/
├── api/v1/              # REST endpoints
├── apps/
│   ├── announcements/   # объявления
│   ├── pets/            # животные
│   └── users/           # пользователи
├── config/              # настройки Django
└── templates/           # email-шаблоны

zooplatforma_frontend/
├── src/
│   ├── pages/           # страницы
│   ├── features/        # бизнес-логика
│   ├── shared/          # переиспользуемое
│   └── store/           # Redux
```

## Конфигурация

Переменные в `zooplatforma_backend/.env`:

```env
POSTGRES_DB=zoo_project
POSTGRES_USER=zoo_user
POSTGRES_PASSWORD=zoo_password
SECRET_KEY=your-secret-key
DEBUG_VALUE=True
REDIS_URL=redis://redis:6379/1
CELERY_BROKER_URL=redis://redis:6379/0
```

После правки `.env` делаем `make restart`.

## Разработка

Если Docker не нужен:

**Backend:**
```bash
cd zooplatforma_backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend:**
```bash
cd zooplatforma_frontend
npm install
npm run dev
```

**Тесты:**
```bash
cd zooplatforma_backend && pytest
cd zooplatforma_frontend && npm test
```

## Траблшутинг

**Порт занят:**
```bash
make clean
make setup
```

**Проблемы с БД:**
```bash
make down
docker volume rm zooplatforma-1_postgres_data
make setup
```

**Логи:**
```bash
make logs
docker compose logs backend -f
```

**Статус:**
```bash
make status
make test-stack
```

## Production

Для прода используйте `docker-compose.production.yml`:

```bash
cd zooplatforma_backend
docker compose -f docker-compose.production.yml up -d
```

**Важно:**
- `DEBUG_VALUE=False`
- Смените `SECRET_KEY`
- Настройте HTTPS
- Настройте SMTP
- Сильные пароли
- Backup БД
