export enum ZodValidationErrors {
    invNumFormat = "Неправильный формат числа",
}

export enum AppErrors {
    rateLimit = "Слишком много запросов к api",
    healthCheck = "Ошибка при healthchech БД",
}

export enum GoogleErrors {
    listUpdate = "Произошла ошибка при обновлении данных листа",
    sheetsUpdate = "Произошла ошибка при обновлении списка листов",
    listCreate = "Лист не создан",
    sheetGeneric = "Ошибка при работе с Google Sheets",
    listDelete = "Ошибка при удалении листа",
    queryParams = "Не указаны params",
}

export enum MarketplaceErrors {
    fetchGeneric = "Произошла ошибка при получении данных с api маркетплейса",
    fetchBoxTariffs = "Ошибка при получении тарифов коробов с api маркетплейса",
}

export enum DBErrors {
    missingProperites = "Не переданы значения",
    uploadError = "Произошла ошибка при загрузке в БД",
}
