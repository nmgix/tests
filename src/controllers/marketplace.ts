import express from "express";
import { fetchTariffs } from "#services/marketplace.ts";
import { logger } from "#logger.ts";
import { HttpStatusCode } from "axios";
import { MarketplaceErrors } from "#shared/errors.messages.ts";
import { regexYYYYMMDD, parseDateWithTimezone } from "#shared/date.ts";

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
        if (!apiData?.response.data) throw new Error(MarketplaceErrors.fetchBoxTariffs);
        logger.info(`Получено ${apiData?.response.data.warehouseList.length} складов`);
        // здесь отправка в бд pg
        return res.status(HttpStatusCode.Ok).json(apiData.response.data);
    } catch (error: any) {
        return res.status(HttpStatusCode.NotFound).json(error);
    }
});

export { marketplaceRouter };
