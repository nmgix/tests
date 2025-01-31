import "#shared/dotenv.ts";
import "#db/google/init.ts";
import "googleapis";
import { google } from "googleapis";
import { createSpreadsheet, createListIfNotExists, deleteSpreadsheet } from "#db/google/methods.ts";
import { updateWarehouseSheet, updateWarehouseSheets, processWarehouses } from "#services/google.ts";
import { warehouseList, warehouseListMock } from "#shared/mockdata.ts";

// jest.mock('./createStream', () => ({
//     ...jest.requireActual('./createStream'),
//     processChunk: jest.fn().mockResolvedValue([["mocked"], ["data"]])
// }));

describe("Обновление гугл таблиц", () => {
    describe("sync tests", () => {
        test("Получение значений складов", () => {
            const result = processWarehouses(warehouseList);
            expect(result.length).toBe(29); // 1+ (28+1) потому что первый массив это ключи
            expect(result[1 + 5][0]).toBe(145); // 1+ потому что первый массив это ключи
        });
    });

    describe("async tests", () => {
        let sheetId: string | null = null;
        const drive = google.drive({ version: "v3" });

        // beforeEach тоже подойдёт, но придётся дольше ждать (~1мин)
        beforeAll(async () => {
            // к тому-же проверка создания таблицы для листов
            sheetId = await createSpreadsheet(String(new Date().getMilliseconds()), drive);
        }, 10000);

        // afterEach тоже подойдёт, но придётся дольше ждать (~1мин)
        afterAll(async () => {
            // к тому-же  проверка удаления
            if (sheetId === null) throw Error("Лист не был создан");
            await deleteSpreadsheet(sheetId, drive);
        });

        test("Создание таблицы", async () => {
            if (sheetId === null) throw Error("Лист не был создан");
            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            const resultSheetname = await createListIfNotExists(sheetId, sheetName);
            expect(resultSheetname).toBe(sheetName);
        });

        test("Добавление складов", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const rows = 10;
            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            const processedWarehousess = processWarehouses(warehouseList);
            console.log(processedWarehousess);
            await updateWarehouseSheet(sheetId, processedWarehousess, sheetName);
            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            // if (!testWarehouses || testWarehouses.length !== rows) throw new Error("Длина массива не сходится/массив не найден")
            console.log(req.data.values);
            expect(req.data.values?.length).toBe(rows);
            expect(req.data.values![1 + 5][0]).toBe("145"); // 1+ потому что первый массив это ключи
        });

        test("Добавление складов в несколько гугл таблиц", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const sheet2 = await createSpreadsheet("mock_spreadsheet2", drive);
            const sheet3 = await createSpreadsheet("mock_spreadsheet3", drive);

            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            const rows = 10;

            await updateWarehouseSheets([sheetId, sheet2, sheet3], warehouseListMock, sheetName);

            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            const req2 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheet2, range: `${sheetName}!A1:F${rows}` });
            expect(req2.data.values?.length).toBe(rows);
            const req3 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheet3, range: `${sheetName}!A1:F${rows}` });
            expect(req3.data.values?.length).toBe(rows);

            await deleteSpreadsheet(sheet2, drive);
            await deleteSpreadsheet(sheet3, drive);
        }, 30000);

        test("Обновление значений", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const rows = 10;
            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            await updateWarehouseSheet(sheetId, processWarehouses(warehouseList), sheetName);
            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            expect(req.data.values![1 + 5][0]).toBe("145");

            await updateWarehouseSheet(sheetId, processWarehouses(warehouseListMock), sheetName);
            const req2 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            expect(req2.data.values![1 + 5][0]).toBe("105");
        }, 20000);

        test("Добавление и сортировка (по возрастанию) складов (как в updateWarehouseSheets)", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const rows = 10;
            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            await updateWarehouseSheet(
                sheetId,
                processWarehouses(warehouseList.sort((wA, wB) => Number(wA.boxDeliveryAndStorageExpr) - Number(wB.boxDeliveryAndStorageExpr))),
                sheetName,
            );
            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            // if (!testWarehouses || testWarehouses.length !== rows) throw new Error("Длина массива не сходится/массив не найден")
            expect(req.data.values?.length).toBe(rows);
            expect(req.data.values![1 + 0][0]).toBe("75"); // 1+ потому что первый массив это ключи
            expect(req.data.values![1 + 4][0]).toBe("115"); // 1+ потому что первый массив это ключи
        });
    });
});
