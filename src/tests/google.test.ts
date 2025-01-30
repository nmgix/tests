import "#shared/dotenv.ts";
import "#db/google/init.ts";
import "googleapis";
import { drive_v2, google, sheets_v4 } from "googleapis";
import { updateSheet, updateSheets, processWarehouses, createListIfNotExists } from "#services/google.ts";
import { warehouseList, warehouseListMock } from "#shared/mockdata.ts";
import { GoogleErrors } from "#shared/errors.ts";

// jest.mock('./createStream', () => ({
//     ...jest.requireActual('./createStream'),
//     processChunk: jest.fn().mockResolvedValue([["mocked"], ["data"]])
// }));

const createSpreadsheet = async (spreadsheetTitle: string, sheets: sheets_v4.Sheets) => {
    const response = await sheets.spreadsheets.create({
        requestBody: {
            properties: { title: String(spreadsheetTitle) },
        },
    });
    if (typeof response.data.spreadsheetId !== "string") throw Error("Лист не создан");
    return response.data.spreadsheetId;
};
const deleteSpreadsheet = async (spreadsheetTitle: string, drive: drive_v2.Drive) => {
    const response = await drive.files.delete({ fileId: spreadsheetTitle });
    if (response.status !== 204) throw new Error(GoogleErrors.listDelete);
};

describe("Обновление гугл таблиц", () => {
    describe("sync tests", () => {
        test("Получение значений складов", () => {
            const result = processWarehouses(warehouseList);
            expect(result.length).toBe(28);
            expect(result[5][0]).toBe("145");
        });
    });

    describe("async tests", () => {
        let sheetId: string | null = null;
        const sheets = google.sheets({ version: "v4" });
        const drive = google.drive({ version: "v2" });

        beforeAll(async () => {
            sheetId = await createSpreadsheet(String(new Date().getMilliseconds()), sheets);
        });
        afterAll(async () => {
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
            await updateSheet(sheetId, processWarehouses(warehouseList), sheetName);
            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            // if (!testWarehouses || testWarehouses.length !== rows) throw new Error("Длина массива не сходится/массив не найден")
            expect(req.data.values?.length).toBe(rows);
            expect(req.data.values![5][0]).toBe("145");
        });

        test("Добавление складов в несколько гугл таблиц", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const sheet2 = await createSpreadsheet("mock_spreadsheet2", sheets);
            const sheet3 = await createSpreadsheet("mock_spreadsheet3", sheets);

            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            const rows = 10;

            await updateSheets([sheetId, sheet2, sheet3], warehouseListMock, sheetName);

            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            const req2 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheet2, range: `${sheetName}!A1:F${rows}` });
            expect(req2.data.values?.length).toBe(rows);
            const req3 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheet3, range: `${sheetName}!A1:F${rows}` });
            expect(req3.data.values?.length).toBe(rows);

            await deleteSpreadsheet(sheet2, drive);
            await deleteSpreadsheet(sheet3, drive);
        }, 10000);

        test("Обновление значений", async () => {
            if (!sheetId) throw new Error("Лист не создан");
            const rows = 10;
            const sheetName = process.env.GOOGLE_SHEET_NAME || "mock_sheet";
            await updateSheet(sheetId, processWarehouses(warehouseList), sheetName);
            const req = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            expect(req.data.values![5][0]).toBe("145");

            await updateSheet(sheetId, processWarehouses(warehouseListMock), sheetName);
            const req2 = await google.sheets("v4").spreadsheets.values.get({ spreadsheetId: sheetId, range: `${sheetName}!A1:F${rows}` });
            expect(req.data.values?.length).toBe(rows);
            expect(req2.data.values![5][0]).toBe("104");
        }, 10000);
    });
});
