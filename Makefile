.PHONY: build up down logs restart demo frontend-shell backend-shell ensure-env test-stack

COMPOSE_FILE=docker-compose.yml
BACKEND_ENV_FILE=zooplatforma_backend/.env
BACKEND_ENV_TEMPLATE=zooplatforma_backend/.env.example

ensure-env:
	@if [ ! -f $(BACKEND_ENV_FILE) ]; then \
		cp $(BACKEND_ENV_TEMPLATE) $(BACKEND_ENV_FILE); \
		echo "Created $(BACKEND_ENV_FILE) from template"; \
	fi

build: ensure-env
	docker compose -f $(COMPOSE_FILE) build

up: ensure-env
	docker compose -f $(COMPOSE_FILE) up -d

down:
	docker compose -f $(COMPOSE_FILE) down --remove-orphans

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
