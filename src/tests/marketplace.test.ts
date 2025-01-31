import { fetchTariffs } from "#services/marketplace.ts";

describe("Работа с api маркетплейса", () => {
    test("Получение данных с апи", async () => {
        const data = await fetchTariffs();
        expect(data?.response.data.warehouseList).toBeDefined();
    });

    // мог бы мокнуть axios ответ и сравнить как zod парсит данные
    // или вернуть данные с ошибками (типа полей undefined вместо string)
});
