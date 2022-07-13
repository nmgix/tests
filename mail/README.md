# Микросервис Почта

Отвечает за отправку сообщений пользователям.

В локальном билде использовался SMTP сервер от компании Sendinblue.

## Как стартовать

**Создать `env` как в примере ниже в текущей директории:**

```json
   SMTP_LOGIN=<почта>
   SMTP_PASSWORD=<пароль>
   SMTP_SERVER=<smtp.domain.com>
   SMTP_PORT=587
   SENDER_EMAIL=<почта>

   CLIENT_URL=clients-reverse-proxy-1:8081
```

> Если используется SMTP от Sendinblue, то в `SENDER_EMAIL` можно поставить значение `SMTP_LOGIN`.

**Указать кол-во процессов в `./nginx.conf` и в `docker-compose.yml`**

**Находясь в директории прописать**

1. `docker build -t mailingapp ./service/`
2. `docker-compose build && docker-compose up -d`

### Что необходимо сделать

1. [x] Настроить эндпоинты для отправки поздравительного письма
2. [ ] Настроить Kafka чтобы выставлять периодичность отправления сообщений в 1с
3. [x] Настроить Nginx для масштабирования
4. [x] Настроить контейнер для приложения
5. [x] Настроить docker-compose.yml
