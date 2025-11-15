# zoo_back

## Запуск проекта локально

1. На GitHub форкнуть ветку 'develop' и клонировать репо:

    ```bash
    git clone git@github.com:Studio-Yandex-Practicum/zoo_back.git
    ```

2. Переключиться локально в ветку 'develop':

    ```bash
    cd zoo_back
    git branch -a           - см все ветки
    git checkout develop    - переходим в ветку 'develop'
    git branch              - прверяем, что находимся в ветке develop
    ```

3. Установить poetry и активировать виртуальное окружение:

    ```bash
    pip install poetry
    poetry config virtualenvs.in-project true
    poetry shell
    poetry install --with dev
    ```

4. Развернуть pre-commit:

    ```bash
    poetry run pre-commit install
    ```

    1. Для push используем (Внимание!!! для успешного коммита, необходимо, подключить проект к БД):

        ```bash
        git add .
        git commit -m 'правильный коммит'
        см.: (https://gist.github.com/Voloshin-Sergei/ffbec67c6d9fcb32b0df014ababba0e9)
        git push
        ```

    2. Создать Pull Request:

        * На Вашей странице GitHub выбрать копию репо
        * Выбрать ветвь feature и нажать кнопку Pull Request
        * Ввести название и описание Ваших изменений
        * Слева (ветка, куда будут вливаться изменения) - выбрать 'develop'
        * Справа (изменения с Вашего репозитория) - выбрать нужное
        * Нажать кнопку: 'Send pull request'

5. Использование Makefile для управления контейнерами:

    * Создать локальный `.env` на основе шаблона:

        ```bash
        make ensure-env
        ```

        Команда копирует `.env.example` в `.env`, если файл ещё не создан.

    * Запуск контейнеров:

        ```bash
        make up
        ```

    * Остановка и удаление контейнеров:

        ```bash
        make down
        ```

    * Создание суперпользователя:

        ```bash
        make superuser
        ```

    * Запуск pre-commit:

        ```bash
        make pre-commit
        ```

    * Заблокировать файлы pyproject.toml:

        ```bash
        make lock
        ```

## Запуск тестов

Запускаем из каталога zoo_back/backend

```commandline
pytest
```

## Рекомендации по написанию тестов

Фикстуры общие для всех приложений должны находиться в `test/conftest.py`.
Фикстуры относящиеся к конкретному приложению должны быть разнесены по пакетам `{test/packege_name}/conftest.py`

Файлы с тестами должны начинаться с 'test_*/.ry'

## Запуск Postgres в контейнере

### создать контуйнер `postgres_dev`

Создай файл `.env` в директории `backend`, заполни его согласно [.env.example](./.env.example):

Запускаем из каталога `zoo_back/backend`

* Пересоздать и запустить контейнер

    ```bash
    docker-compose up -d
    ```

* Остановить и удалить контейнер

    ```bash
    docker-compose down
    ```

* Удалить volume, вместе с БД, если данные ненужны:

    ```bash
    docker volume rm backend_db_data_dev
    ```

### Работа с данными внутри контейнера

Запускаем из каталога `zoo_back/backend`

```bash
docker exec -it postgres_dev psql -U zoo_user -d zoo_project
```

postgres_dev — это имя контейнера
zoo_user — имя пользователя PostgreSQL
zoo_project — имя базы данных

* Набор полезных команд в psql

    ```sql
    \help — выводит справку по командам;
    \l — выводит список баз данных на сервере;
    \dt — выводит список таблиц в текущей базе данных;
    DROP TABLE pets_pet CASCADE; - удалить таблицу `pets_pet`;
    ```
