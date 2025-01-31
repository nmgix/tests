import express from "express";
import { fetchTariffs } from "#services/marketplace.ts";
import { logger } from "#logger.ts";
import { HttpStatusCode } from "axios";
import { DBErrors, MarketplaceErrors } from "#shared/errors.messages.ts";
import { regexYYYYMMDD, parseDateWithTimezone } from "#shared/date.ts";
import { setWarehouses } from "#services/db.ts";

const marketplaceRouter = express.Router();
marketplaceRouter.get("/testreq", async (_req, res) => {
    try {
        const data = await fetchTariffs();
        return res.json(data);
    } catch (error) {
        return res.status(HttpStatusCode.InternalServerError).json(error);
    }
});

marketplaceRouter.post<{}, {}, {}, { date?: string }>("/todb", async (req, res) => {
    try {
        let fetchDay = new Date();
        if (req.query?.date && regexYYYYMMDD.test(req.query?.date)) fetchDay = parseDateWithTimezone(req.query.date);
        const apiData = await fetchTariffs(fetchDay);
        if (!apiData?.response.data) throw new Error(String(HttpStatusCode.NotFound));
        logger.info(`Получено ${apiData?.response.data.warehouseList.length} складов`);
        // здесь отправка в бд pg
        const uploadResult = await setWarehouses(apiData.response.data.warehouseList, fetchDay);
        if (uploadResult !== true) throw new Error(String(HttpStatusCode.BadRequest));
        return res.status(HttpStatusCode.Ok).json(apiData.response.data);
    } catch (error: any) {
        switch (error.message) {
            case HttpStatusCode.NotFound:
                return res.status(HttpStatusCode.NotFound).json(MarketplaceErrors.fetchBoxTariffs);
            case HttpStatusCode.BadRequest:
                return res.status(HttpStatusCode.BadRequest).json(DBErrors.uploadError);
            default:
                return res.status(HttpStatusCode.InternalServerError).json(error); // в nest обычно прикручивал middleware чтобы не рендерить internal в проде
        }
    }
});

export { marketplaceRouter };
