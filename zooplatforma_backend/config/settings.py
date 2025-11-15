import environ
import os
from datetime import timedelta
from pathlib import Path
from typing import cast


def _split_env_list(value: str) -> list[str]:
    return [item.strip() for item in value.split(',') if item.strip()]

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DJANGO_ENV=(str, "production"),
)

environ.Env.read_env(env_file=os.path.join(BASE_DIR, '.env'))


def _get_env_value(name: str, default: str) -> str:
    if name in os.environ:
        return cast(str, env(name))
    return default


def _get_env_int(name: str, default: int) -> int:
    if name in os.environ:
        return cast(int, env.int(name))
    return default


def _get_env_bool(name: str, default: bool) -> bool:
    if name in os.environ:
        return cast(bool, env.bool(name))
    return default

SECRET_KEY = env('SECRET_KEY')

raw_debug = os.getenv('DEBUG')
if raw_debug is None:
    raw_debug = os.getenv('DEBUG_VALUE', 'False')
DEBUG = raw_debug.lower() in {'1', 'true', 'yes', 'on'}

ALLOWED_HOSTS = _split_env_list(os.getenv('ALLOWED_HOSTS', 'localhost'))
CSRF_TRUSTED_ORIGINS = _split_env_list(os.getenv('CSRF_TRUSTED_ORIGINS', ''))

DJANGO_ENV = os.getenv('DJANGO_ENV', 'production')

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
DOMAIN = os.getenv('DOMAIN', 'http://localhost:8000')
CORS_ALLOW_HEADERS = [
    "content-type",
    "authorization",
    "x-csrftoken",
    "accept",
    "origin",
    "user-agent",
    "dnt",
    "cache-control",
    "x-requested-with",
    "if-modified-since",
    "pragma",
    "last-modified",
    "content-disposition",
    "content-transfer-encoding",
    "upgrade-insecure-requests",
    "x-csrftoken",
    "x-xsrf-token",
    "x-auth-token",
]

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "rest_framework",
    "djoser",
    "drf_spectacular",
    "django_filters",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "api.apps.ApiConfig",
    "apps.users.apps.UsersConfig",
    "apps.pets.apps.PetsConfig",
    "apps.announcements.apps.AnnouncementsConfig",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = "config.wsgi.application"

if DJANGO_ENV == 'development':
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': env('POSTGRES_DB'),
            'USER': env('POSTGRES_USER'),
            'PASSWORD': env('POSTGRES_PASSWORD'),
            'HOST': os.getenv('DB_HOST', 'db'),
            'PORT': os.getenv('DB_PORT', '5432'),

        }
    }

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "ru-RU"

TIME_ZONE = "Europe/Moscow"
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "static"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTH_USER_MODEL = "users.ZooUser"

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "EXCEPTION_HANDLER": "config.utils.custom_exception_handler",
}


SPECTACULAR_SETTINGS = {
    "TITLE": "Зооплатформа",
    "DESCRIPTION": "",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
}


SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',

    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',
}

EMAIL_BACKEND = _get_env_value('EMAIL_BACKEND', 'django.core.mail.backends.console.EmailBackend')
EMAIL_HOST = _get_env_value('EMAIL_HOST', 'localhost')
EMAIL_PORT = _get_env_int('EMAIL_PORT', 1025)
EMAIL_USE_SSL = _get_env_bool('EMAIL_USE_SSL', False)
EMAIL_HOST_USER = _get_env_value('EMAIL_HOST_USER', '')
EMAIL_HOST_PASSWORD = _get_env_value('EMAIL_HOST_PASSWORD', '')
DEFAULT_FROM_EMAIL = _get_env_value('DEFAULT_FROM_EMAIL', 'noreply@example.com')
SERVER_EMAIL = _get_env_value('SERVER_EMAIL', 'admin@example.com')

APPEND_SLASH = False

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "Bearer": {"type": "apiKey", "name": "Authorization", "in": "header"}
    }
}

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TIMEZONE = "UTC"

LOG_DIR = BASE_DIR / 'logs'
LOG_DIR.mkdir(exist_ok=True)

CACHE_TTL = int(os.getenv('CACHE_TTL', '60'))

REDIS_URL = os.getenv('REDIS_URL', os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'))

CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': REDIS_URL,
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
        },
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '[{asctime}] {levelname} {name}: {message}',
            'style': '{',
        },
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': LOG_DIR / 'app.log',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'apps.users.tasks': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['console'],
            'level': 'WARNING',
            'propagate': False,
        },
    },
}
