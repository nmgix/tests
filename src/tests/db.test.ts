import { setWarehouses, getWarehouses } from "#services/db.ts";
import { warehouseList } from "#shared/mockdata.ts";
describe("Сохранение и отдача данных с бд", () => {
    test("Загрузка моковых данных в бд", async () => {
        // загрузка mockdata.ts/warehouseList
        const idk = await setWarehouses(warehouseList);
        expect(idk).toBe(true);
    });
    // test("Получение данных с бд за дату", async () => {
    //     // загрузка под этой датой
    //     // получение
    // });
});
