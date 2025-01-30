## Переменные

NODE_ENV: development | production

1. root/.env

```.env
WB_API_KEY=some-api-key
WB_BASE_URL=https://common-api.wildberries.ru/api/v1
WB_BOX_TARIFF_ENDPOINT=/tariffs/box

GOOGLE_SHEET_NAME=stocks_coefs
GOOGLE_TRUSTED_EMAIL=some@gmail.com
```

2. root/db.env

```.env
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=mydb
DATABASE_URL=postgres://user:password@postgres:5432/mydb
PGADMIN_DEFAULT_EMAIL=admin@example.com
PGADMIN_DEFAULT_PASSWORD=admin
```

3. root/credentials.json (google)
   apis: spreadsheets и drive (drive для тестов)

## Проблемы

1. Не разобрался как автоматически выдавать доступ к таблицам пользователям со статусом owner на том-же с сервисным аккаунтом проекте (вроде создание через google drive должно было решить проблему). Приходится почту в env вносить.
2. В каком хранить формате строчки не ясно, иногда с апи приходят прочерки, про преобразование никто не упоминал в тестовом, но его подобие есть в entities/wb/warehouses.ts
