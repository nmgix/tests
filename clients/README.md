# Микросервис Авторизация

Отвечает за авторизацию и регистрацию пользователей, манипуляцию пользователями (CRUD).

## Как стартовать

**Создать `env` как в примере ниже в текущей директории:**

```json
   MYSQL_DATABASE=users_db
   MYSQL_ROOT_PASSWORD=pass
   MYSQL_PORT_OUTSIDE=52000
   MYSQL_PORT_LOCAL=3306
   SQL_HOST=clients-database
   SQL_USER=root
   SQL_PASSWORD=pass
   JWT_SECRET=secret_word
   JWT_EXPIRES_IN=1800000

   MAIL_URL=mail-reverse-proxy-1
   MAIL_PORT=8083
```

**Указать кол-во процессов в `./nginx.conf` и в `docker-compose.yml`**

**Находясь в директории прописать**

1. `docker build -t clients ./service/`
2. `docker-compose build && docker-compose up -d`

> Базе данных нужно какое-то время (~3 мин.) чтобы проснуться, у clients-app-\* уже выставлен `restart: on-failure`.

### Что необходимо сделать

1. [x] Роутер логики авторизации/регистрации
   1. [x] Роут авторизации и регистрации
      1. [x] Роут авторизации
      2. [x] Роут регистрации
   2. [x] Роут манипуляции пользователями
      1. [x] Создание пользователя в бд
      2. [x] Получения пользователя из бд
      3. [x] Обновление пользователя в бд
      4. [x] Удаление пользователя из бд
2. [x] Связать регистрацию с микросервисом почты, чтобы при регистрации отправлялось приветственное письмо
3. [x] Настроить Nginx для масштабирования
4. [x] Настроить контейнер для приложения
5. [x] Настроить контейнер для базы данных
6. [x] Настроить docker-compose.yml

## Примеры запросов

### `POST` http://localhost:8081/auth/register

```json
{
  "name": "danya",
  "email": "danyatchistoff@yandex.ru",
  "password": "123"
}
```

### `POST` http://localhost:8081/auth/authorize

```json
{
  "login": "danya",
  "password": "123"
}
```

### `GET` http://localhost:8081/user/all/

### `POST` http://localhost:8081/user/spy/?id=new_user

### `DELETE` http://localhost:8081/user/ или http://localhost:8081/user/?id=danya

### `PUT` http://localhost:8081/user/
