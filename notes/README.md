# Микросервис Заметки

Отвечает манипуляцию записями (CRUD).

## Как стартовать

**Создать `env` как в примере ниже в текущей директории:**

```json
   MYSQL_DATABASE=notes_db
   MYSQL_ROOT_PASSWORD=pass
   APP_LOCAL=8080
   APP_OUTSIDE=8080
   MYSQL_PORT_OUTSIDE=53000
   MYSQL_PORT_LOCAL=3306
   SQL_HOST=notes-database
   SQL_USER=root
   SQL_PASSWORD=pass

   CLIENT_URL=clients-reverse-proxy-1:8081
```

**Указать кол-во процессов в `./nginx.conf` и в `docker-compose.yml`**

**Находясь в директории прописать**

1. `docker build -t notes ./service/`
2. `docker-compose build && docker-compose up -d`

> Базе данных нужно какое-то время (~3 мин.) чтобы проснуться, у notes-app-\* уже выставлен `restart: on-failure`.

### Что необходимо сделать

1. [] Роутер записей
   1. [] Роут авторизации
   2. [] Роут записей
      1. [] Создание записи в бд
      2. [] Получения записи из бд
      3. [] Обновление записи в бд
      4. [] Удаление записи из бд
2. [ ] Настроить Nginx для масштабирования
3. [x] Настроить контейнер для приложения
4. [x] Настроить контейнер для базы данных
5. [x] Настроить docker-compose.yml
