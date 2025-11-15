.PHONY: up down superuser lock pre-commit help ensure-env

ENV_FILE=.env
ENV_TEMPLATE=.env.example

ensure-env: ## Создать .env из шаблона при отсутствии
	@if [ ! -f $(ENV_FILE) ]; then \
		cp $(ENV_TEMPLATE) $(ENV_FILE); \
		echo "Создан $(ENV_FILE) из $(ENV_TEMPLATE)"; \
	fi

up: ensure-env ## Запустить docker-compose.yml
	docker-compose up -d

down: ensure-env ## Остановить и удалить контейнеры
	docker-compose down

superuser: ensure-env ## Создать суперпользователя
	docker-compose exec web python manage.py createsuperuser

lock: ## Заблокировать файлы pyproject.toml
	poetry lock

pre-commit: ## Запустить pre-commit
	pre-commit run --all-files

help: ## Показать доступные команды
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
