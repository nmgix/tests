import { createListIfNotExists } from "../db/google/methods";
import { processWarehouses, Warehouse } from "../entities/wb/warehouse";
import { logger } from "../logger";
import { GoogleMessages } from "../shared/default.messages";
import { GoogleErrors } from "../shared/errors.messages";
import { google } from "googleapis";

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
