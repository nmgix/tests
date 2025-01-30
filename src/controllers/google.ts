import { createListIfNotExists, parseSpreadsheetIds } from "#db/google/methods.ts";
import { logger } from "#logger.ts";
import { updateWarehouseSheets } from "#services/google.ts";
import { GoogleErrors } from "#shared/errors.messages.ts";
import { warehouseList } from "#shared/mockdata.ts";
import { HttpStatusCode } from "axios";
import express from "express";
const googleRouter = express.Router();
const fallbackSheetname = "stocks_coefs";

googleRouter.post<{}, {}, {}, { table_name: string; sheetId: string }>("/createlist", async (req, res) => {
    try {
        if (!req.query.table_name || !req.query.sheetId) throw new Error(String(HttpStatusCode.UnprocessableEntity));
        const sheetName = req.query.table_name || process.env.GOOGLE_SHEET_NAME || fallbackSheetname;
        const resultSheetname = await createListIfNotExists(req.query.sheetId, sheetName);
        return res.status(HttpStatusCode.Created).json(resultSheetname);
    } catch (error) {
        if (error == HttpStatusCode.UnprocessableEntity) return res.status(HttpStatusCode.UnprocessableEntity).json(GoogleErrors.queryParams); // красивое оформление body/query я только в nest делал
        return res.status(HttpStatusCode.InternalServerError);
    }
});

googleRouter.put<{}, {}, { spreadSheetIds: string | string[] }, { sheetName?: string; date?: string }>("/fromdb", async (req, res) => {
    try {
        if (!req.body.spreadSheetIds) throw new Error(String(HttpStatusCode.UnprocessableEntity));
        // по тз указано что в google должны отправляться самые последние данные, я напишу этот тестовый метод, но в "прод" его тащить (по тз) нет смысла
        // /post с выбором даты? pg to google
        const knexData = warehouseList; // тут фикс дата, при получении с pg нужно проверять на наличие req.query.date,

        // тут получение с knex
        const spreadsheets = typeof req.body.spreadSheetIds === "string" ? parseSpreadsheetIds(req.body.spreadSheetIds) : req.body.spreadSheetIds;
        await updateWarehouseSheets(spreadsheets, knexData, req.query.sheetName || process.env.GOOGLE_SHEET_NAME || fallbackSheetname);
        return res.status(HttpStatusCode.Ok).json({ tables: spreadsheets, warehouses: knexData.length });
    } catch (error) {
        if (error == HttpStatusCode.UnprocessableEntity) return res.status(HttpStatusCode.UnprocessableEntity).json(GoogleErrors.queryParams); // красивое оформление body/query я только в nest делал
        return res.status(HttpStatusCode.InternalServerError);
    }
});

export { googleRouter };
