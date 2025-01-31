import { createListIfNotExists } from "#db/google/methods.ts";
import { Warehouse, warehouseScheme } from "#entities/wb/warehouse.ts";
import { logger } from "#logger.ts";
import { GoogleMessages } from "#shared/default.messages.ts";
import { GoogleErrors } from "#shared/errors.messages.ts";
import { google } from "googleapis";
import z from "zod";

/** Получение значений Warehouse */
export const processWarehouses = (chunk: Warehouse[]) => {
    if (chunk[0] === undefined) return [];
    const zodChunk = z.array(warehouseScheme).parse(chunk);
    return [Object.keys(chunk[0]), ...zodChunk.map((obj) => Object.values(obj))];
};

/** Обновление данных в google листе */
export async function updateWarehouseSheet(spreadsheetId: string, warehouseValues: (string | number)[][], sheetName: string) {
    try {
        const _sheetName = await createListIfNotExists(spreadsheetId, sheetName);

        const gData = warehouseValues;
        await google
            .sheets("v4")
            .spreadsheets.values.update({ spreadsheetId, range: `${_sheetName}!A1`, valueInputOption: "RAW", requestBody: { values: gData } });
        // .spreadsheets.values.append({ spreadsheetId, range: `${sheetName}!A1`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: gData } });
        logger.info(`${GoogleMessages.listUpdate}: ${spreadsheetId}, внесены ${warehouseValues.length - 1} складов`);
    } catch (error) {
        const _error = error ? `${GoogleErrors.listUpdate}, ${error}` : GoogleErrors.listUpdate;
        logger.error(_error);
        return new Error(_error);
    }
}

/** Рассылка на все google листы */
export async function updateWarehouseSheets(sheetIds: string[], data: Warehouse[], sheetName: string) {
    try {
        const warehouseValues = processWarehouses(data.sort((wA, wB) => Number(wA.boxDeliveryAndStorageExpr) - Number(wB.boxDeliveryAndStorageExpr)));
        await Promise.all(sheetIds.map((sheetId) => updateWarehouseSheet(sheetId, warehouseValues, sheetName)));
        logger.info(`Кол-во таблиц: ${sheetIds.length}, кол-во складов: ${data.length}`);
    } catch (error) {
        const _error = error ? `${GoogleErrors.sheetsUpdate}, ${error}` : GoogleErrors.sheetsUpdate;
        logger.error(_error);
        return new Error(_error);
    }
}
