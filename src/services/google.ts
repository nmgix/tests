import { Warehouse, warehouseScheme } from "#entities/wb/warehouse.ts";
import { logger } from "#logger.ts";
import { GoogleErrors } from "#shared/errors.ts";
import { google } from "googleapis";
const warehouseKeys = Object.keys(warehouseScheme);
// import { Readable } from "node:stream";

/** Получение значений Warehouse без ключей */
export const processWarehouses = (chunk: Warehouse[]) => {
    return chunk.map((obj) => Object.values(obj));
};

/** Проверка и осздание листа если не создан */
export async function createListIfNotExists(spreadsheetId: string, sheetName: string) {
    const sheets = google.sheets({ version: "v4" });

    try {
        const response = await sheets.spreadsheets.get({
            spreadsheetId: spreadsheetId,
        });

        const sheetExists = response.data.sheets?.some((sheet) => sheet.properties?.title === sheetName);

        if (sheetExists) {
            return sheetName;
        } else {
            const request = {
                spreadsheetId: spreadsheetId,
                resource: {
                    requests: [
                        {
                            addSheet: {
                                properties: {
                                    title: sheetName,
                                },
                            },
                        },
                    ],
                },
            };

            const createSheetResponse = await sheets.spreadsheets.batchUpdate(request);
            if (!createSheetResponse.data.replies || createSheetResponse.data.replies[0]?.addSheet?.properties?.title !== sheetName)
                throw new Error(GoogleErrors.listCreate);
            return sheetName;
        }
    } catch (error) {
        logger.error(`${GoogleErrors.sheetGeneric}: ${error}`);
    }
}

/** Обновление данных в google листе */
export async function updateSheet(spreadsheetId: string, warehouseValues: string[][], sheetName: string) {
    try {
        const _sheetName = await createListIfNotExists(spreadsheetId, sheetName);

        const gData = [warehouseKeys, ...warehouseValues];
        const result = await google
            .sheets("v4")
            .spreadsheets.values.update({ spreadsheetId, range: `${_sheetName}!A1`, valueInputOption: "RAW", requestBody: { values: gData } });
        // .spreadsheets.values.append({ spreadsheetId, range: `${sheetName}!A1`, valueInputOption: "RAW", insertDataOption: "INSERT_ROWS", requestBody: { values: gData } });
        logger.info(`Обновил данные на google листе: ${spreadsheetId}, внёс ${warehouseValues.length} складов`);
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
        const _error = error ? `${GoogleErrors.sheetsUpdate}, error: ${error}` : GoogleErrors.sheetsUpdate;
        logger.error(_error);
        return new Error(_error);
    }
}

/** Обработка складов по частям */
// const createStream = async (data: Warehouse[], batchSize = 100) => {
//     let index = 0;

//     const stream = new Readable({
//         objectMode: true,
//         read() {
//             if (index < data.length) {
//                 this.push(data.slice(index, index + batchSize)); // Отправляем батч в поток
//                 index += batchSize;
//             } else {
//                 this.push(null); // Завершаем поток
//             }
//         }
//     });

//     for await (const chunk of stream) {
//         await processChunk(chunk);
//     }
// };
