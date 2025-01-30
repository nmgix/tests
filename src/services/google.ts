import { createListIfNotExists } from "#db/google/methods.ts";
import { Warehouse } from "#entities/wb/warehouse.ts";
import { logger } from "#logger.ts";
import { GoogleMessages } from "#shared/default.messages.ts";
import { GoogleErrors } from "#shared/errors.messages.ts";
import { google } from "googleapis";
// import { Readable } from "node:stream";

/** Получение значений Warehouse */
export const processWarehouses = (chunk: Warehouse[]) => {
    if (chunk[0] === undefined) return [];
    return [Object.keys(chunk[0]), ...chunk.map((obj) => Object.values(obj))];
};

/** Обновление данных в google листе */
export async function updateSheet(spreadsheetId: string, warehouseValues: (string | number)[][], sheetName: string) {
    try {
        const _sheetName = await createListIfNotExists(spreadsheetId, sheetName);

        const gData = warehouseValues;
        await google
            .sheets("v4")
            .spreadsheets.values.update({ spreadsheetId, range: `${_sheetName}!A1`, valueInputOption: "RAW", requestBody: { values: gData } });
        // .spreadsheets.values.append({ spreadsheetId, range: `${sheetName}!A1`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: gData } });
        logger.info(`${GoogleMessages.listUpdate}: ${spreadsheetId}, внесены ${warehouseValues.length} складов`);
    } catch (error) {
        const _error = error ? `${GoogleErrors.listUpdate}, ${error}` : GoogleErrors.listUpdate;
        logger.error(_error);
        return new Error(_error);
    }
}

/** Рассылка на все google листы */
export async function updateSheets(sheetIds: string[], data: Warehouse[], sheetName: string) {
    try {
        const warehouseValues = processWarehouses(data.sort((wA, wB) => Number(wA.boxDeliveryAndStorageExpr) - Number(wB.boxDeliveryAndStorageExpr)));
        await Promise.all(sheetIds.map((sheetId) => updateSheet(sheetId, warehouseValues, sheetName)));
    } catch (error) {
        const _error = error ? `${GoogleErrors.sheetsUpdate}, ${error}` : GoogleErrors.sheetsUpdate;
        logger.error(_error);
        return new Error(_error);
    }
}
