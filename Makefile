.PHONY: build up down logs restart demo frontend-shell backend-shell ensure-env test-stack clean init migrate setup status

COMPOSE_FILE=docker-compose.yml
BACKEND_ENV_FILE=zooplatforma_backend/.env
BACKEND_ENV_TEMPLATE=zooplatforma_backend/.env.example

ensure-env:
	@if [ ! -f $(BACKEND_ENV_FILE) ]; then \
		cp $(BACKEND_ENV_TEMPLATE) $(BACKEND_ENV_FILE); \
		echo "✓ Created $(BACKEND_ENV_FILE) from template"; \
	fi

clean:
	@echo "Stopping and removing all containers..."
	@docker compose -f $(COMPOSE_FILE) down --remove-orphans --volumes || true
	@docker ps -a --format '{{.Names}}' | grep -E '^zooplatforma' | xargs -r docker rm -f || true
	@echo "✓ Cleanup completed"

build: ensure-env
	@echo "Building Docker images..."
	@docker compose -f $(COMPOSE_FILE) build
	@echo "✓ Build completed"

migrate:
	@echo "Running database migrations..."
	docker compose -f $(COMPOSE_FILE) exec backend python manage.py migrate
	@echo "✓ Migrations completed"

setup: clean ensure-env
	@echo "========================================="
	@echo " Zooplatforma - First Time Setup"
	@echo "========================================="
	@echo ""
	@echo "[1/4] Building Docker images..."
	@docker compose -f $(COMPOSE_FILE) build
	@echo "✓ Images built successfully"
	@echo ""
	@echo "[2/4] Starting database and cache..."
	@docker compose -f $(COMPOSE_FILE) up -d db redis
	@echo "✓ Database and cache started"
	@echo ""
	@echo "[3/4] Waiting for services to be healthy..."
	@timeout=60; \
	while [ $$timeout -gt 0 ]; do \
		if docker compose -f $(COMPOSE_FILE) ps db | grep -q "healthy"; then \
			echo "✓ Database is healthy"; \
			break; \
		fi; \
		sleep 2; \
		timeout=$$((timeout - 2)); \
	done
	@echo ""
	@echo "[4/4] Starting backend, celery and frontend..."
	@docker compose -f $(COMPOSE_FILE) up -d backend celery
	@echo "Waiting for backend to be healthy..."
	@timeout=120; \
	while [ $$timeout -gt 0 ]; do \
		if docker compose -f $(COMPOSE_FILE) ps backend | grep -q "healthy"; then \
			echo "✓ Backend is healthy"; \
			break; \
		fi; \
		if docker compose -f $(COMPOSE_FILE) ps backend | grep -q "unhealthy"; then \
			echo "⚠ Backend is unhealthy, checking logs..."; \
			docker compose -f $(COMPOSE_FILE) logs backend --tail=20; \
			exit 1; \
		fi; \
		sleep 3; \
		timeout=$$((timeout - 3)); \
	done
	@docker compose -f $(COMPOSE_FILE) up -d frontend
	@echo ""
	@echo "========================================="
	@echo " ✓ Setup completed successfully!"
	@echo "========================================="
	@echo ""
	@echo "Services are available at:"
	@echo "  Frontend:     http://localhost:8080"
	@echo "  Backend API:  http://localhost:8000/api/v1/"
	@echo "  Admin Panel:  http://localhost:8000/admin"
	@echo ""
	@echo "Default credentials:"
	@echo "  Email:    admin@admin.ru"
	@echo "  Password: admin777"
	@echo ""
	@echo "Useful commands:"
	@echo "  make logs    - View all logs"
	@echo "  make status  - Check service status"
	@echo "  make down    - Stop all services"
	@echo ""

init: setup

up: ensure-env
	@echo "Starting all services..."
	@docker compose -f $(COMPOSE_FILE) up -d
	@echo "✓ All services started"
	@echo ""
	@echo "Run 'make status' to check service status"

down:
	@echo "Stopping all services..."
	@docker compose -f $(COMPOSE_FILE) down --remove-orphans
	@echo "✓ All services stopped"

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

restart: ensure-env
	docker compose -f $(COMPOSE_FILE) down --remove-orphans && docker compose -f $(COMPOSE_FILE) up -d

demo: ensure-env
	docker compose -f $(COMPOSE_FILE) up --build

test-stack: ensure-env
	@echo "Testing full stack..."
	@docker compose -f $(COMPOSE_FILE) up -d
	@echo "Waiting for services to start..."
	@sleep 15
	@echo "\n=== Service Status ==="
	@docker compose -f $(COMPOSE_FILE) ps
	@echo "\n=== Testing Backend API ==="
	@curl -f -s http://localhost:8000/api/v1/ > /dev/null && echo "✓ Backend API responding" || echo "✗ Backend API failed"
	@echo "\n=== Testing Frontend ==="
	@curl -f -s http://localhost:8080 > /dev/null && echo "✓ Frontend responding" || echo "✗ Frontend failed"
	@echo "\n=== Recent Backend Logs ==="
	@docker compose -f $(COMPOSE_FILE) logs backend --tail 20
	@echo "\nStack test completed!"

backend-shell: ensure-env
	docker compose -f $(COMPOSE_FILE) exec backend bash

frontend-shell: ensure-env
	docker compose -f $(COMPOSE_FILE) exec frontend sh

status:
	@echo "=== Service Status ==="
	@docker compose -f $(COMPOSE_FILE) ps
	@echo ""
