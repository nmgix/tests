import { logger } from "../../logger";
import { GoogleErrors } from "../../shared/errors.messages";
import { drive_v3, google } from "googleapis";

/** Разделение id таблиц из .env */
export const parseSpreadsheetIds = (idsEnv: string) => idsEnv.split(",").map((id) => id.trim());

/** Создание таблицы для листов (drive api чтобы назначались права доступа) */
export const createSpreadsheet = async (spreadsheetTitle: string, drive: drive_v3.Drive, sendPermissionEmail: boolean = false) => {
    const fileMetadata = {
        name: spreadsheetTitle,
        mimeType: "application/vnd.google-apps.spreadsheet", // Тип Google Таблицы
    };
    const file = await drive.files.create({
        requestBody: fileMetadata,
        fields: "id",
        // parents: [folderId]
    });

    // id !== spreadsheetTitle
    if (typeof file.data.id !== "string") throw Error("Лист не создан");
    logger.info(`Создана таблица: https://docs.google.com/spreadsheets/d/${file.data.id}`);
    await drive.permissions.create({
        fileId: file.data.id,
        requestBody: {
            type: "user",
            role: "writer",
            emailAddress: process.env.GOOGLE_TRUSTED_EMAIL,
        },
        // https://stackoverflow.com/a/30197499/14889638
        sendNotificationEmail: sendPermissionEmail,
    });
    logger.info(`Доступ к ${file.data.id} выдан пользователю: ${process.env.GOOGLE_TRUSTED_EMAIL}`);
    return file.data.id;
};
/** Удаление таблицы по id */
export const deleteSpreadsheet = async (spreadsheetTitle: string, drive: drive_v3.Drive) => {
    const response = await drive.files.delete({ fileId: spreadsheetTitle });
    if (response.status !== 204) throw new Error(GoogleErrors.listDelete);
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
            logger.info(`list ${sheetName} found, spreadsheetId: ${spreadsheetId}`);
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
            logger.info(`list ${sheetName} created, spreadsheetId: ${spreadsheetId}`);
            return sheetName;
        }
    } catch (error) {
        logger.error(`${GoogleErrors.sheetGeneric}: ${error}`);
    }
}
