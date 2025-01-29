## Переменные

NODE_ENV: development | production

1. root/.env

```.env
WB_API_KEY=some-api-key
WB_BASE_URL=https://common-api.wildberries.ru/api/v1
WB_BOX_TARIFF_ENDPOINT=/tariffs/box
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

3. root/google.env

```.env
SPREADSHEET_ID=id
```

4. root/credentials.json (google)
