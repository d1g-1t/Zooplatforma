#!/bin/sh
set -e

mkdir -p /app/static /app/media /app/logs

python manage.py migrate --noinput
python manage.py collectstatic --noinput
exec gunicorn --bind 0.0.0.0:8000 config.wsgi:application
