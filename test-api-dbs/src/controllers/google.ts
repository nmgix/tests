import { createListIfNotExists, parseSpreadsheetIds } from "../db/google/methods";
import { getWarehouses } from "../services/db";
import { updateWarehouseSheets } from "../services/google";
import { parseDateWithTimezone } from "../shared/date";
import { GoogleErrors } from "../shared/errors.messages";
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
    } catch (error: any) {
        if (error.message == HttpStatusCode.UnprocessableEntity) return res.status(HttpStatusCode.UnprocessableEntity).json(GoogleErrors.queryParams); // красивое оформление body/query я только в nest делал
        return res.status(HttpStatusCode.InternalServerError);
    }
});

googleRouter.put<{}, {}, { spreadSheetIds: string | string[] }, { sheetName?: string; date?: string }>("/fromdbtosheets", async (req, res) => {
    try {
        if (!req.body.spreadSheetIds) throw new Error(String(HttpStatusCode.UnprocessableEntity));
        // по тз указано что в google должны отправляться самые последние данные, я напишу этот тестовый метод, но в "прод" его тащить (по тз) нет смысла
        let fetchDate = new Date();
        if (typeof req?.query?.date === "string") fetchDate = parseDateWithTimezone(req.query.date);
        const dbWarehouses = await getWarehouses(fetchDate);

        // тут получение с knex
        const spreadsheets = typeof req.body.spreadSheetIds === "string" ? parseSpreadsheetIds(req.body.spreadSheetIds) : req.body.spreadSheetIds;
        await updateWarehouseSheets(spreadsheets, dbWarehouses, req.query.sheetName || process.env.GOOGLE_SHEET_NAME || fallbackSheetname);
        return res.status(HttpStatusCode.Ok).json({ tables: spreadsheets, warehouses: dbWarehouses.length });
    } catch (error: any) {
        if (error.message == HttpStatusCode.UnprocessableEntity) return res.status(HttpStatusCode.UnprocessableEntity).json(GoogleErrors.queryParams); // красивое оформление body/query я только в nest делал
        return res.status(HttpStatusCode.InternalServerError);
    }
});

export { googleRouter };
