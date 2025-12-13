FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    dos2unix \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

COPY . .

RUN dos2unix /app/entrypoint.sh && \
    chmod +x /app/entrypoint.sh && \
    addgroup --system app && \
    adduser --system --ingroup app app && \
    mkdir -p /app/static /app/media /app/logs && \
    chown -R app:app /app

USER app

EXPOSE 8000

CMD ["/app/entrypoint.sh"]