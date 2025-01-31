import db from "../db/sql/knex";
import { setWarehouses, getWarehouses } from "../services/db";
import { warehouseList } from "../shared/mockdata";
describe("Сохранение и отдача данных с бд", () => {
    afterAll(async () => {
        await db.destroy();
    });

    test("Загрузка моковых данных в бд", async () => {
        const idk = await setWarehouses(warehouseList);
        expect(idk).toBe(true);
    });
    test("Получение данных с бд за дату", async () => {
        // загрузка под этой датой
        const dateUpload = new Date();
        await setWarehouses(warehouseList, dateUpload);
        // получение
        const dbWarehouses = await getWarehouses(dateUpload);
        expect(dbWarehouses.length).toBe(warehouseList.length);
    });
});
