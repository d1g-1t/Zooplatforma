#!/bin/bash
set -e

echo "Starting Zooplatforma backend..."

mkdir -p /app/static /app/media /app/logs

echo "Waiting for database..."
while ! python -c "import psycopg2; psycopg2.connect(host='${DB_HOST}', port='${DB_PORT}', user='${POSTGRES_USER}', password='${POSTGRES_PASSWORD}', dbname='${POSTGRES_DB}')" 2>/dev/null; do
    sleep 1
done
echo "Database is ready"

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput --clear

if [ ! -f /app/.superuser_created ]; then
    echo "Creating superuser..."
    python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(email='${SUPERUSER_EMAIL}').exists():
    User.objects.create_superuser(
        email='${SUPERUSER_EMAIL}',
        password='${SUPERUSER_PASSWORD}',
        phone='${SUPERUSER_PHONE}',
        first_name='${SUPERUSER_FIRST_NAME}'
    )
    print('Superuser created successfully')
else:
    print('Superuser already exists')
END
    touch /app/.superuser_created
fi

echo "Starting Gunicorn..."
exec gunicorn --bind 0.0.0.0:8000 --workers 4 --worker-class sync --timeout 120 --access-logfile - --error-logfile - config.wsgi:application
