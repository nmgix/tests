import "./shared/dotenv";
import cron from "node-cron";
import { parseSpreadsheetIds } from "./db/google/methods";
import { updateWarehouseSheets } from "./services/google";
import { fetchTariffs } from "./services/marketplace";
import { setWarehouses } from "./services/db";
import { logger } from "./logger";
import { MarketplaceErrors } from "./shared/errors.messages";

cron.schedule("0 * * * *", async () => {
    const sheetName = process.env.GOOGLE_SHEET_NAME || "stocks_coefs";
    const date = new Date();

    const apiWarehouses = await fetchTariffs(date);
    if (!apiWarehouses?.response?.data?.warehouseList) return logger.error(`Cron job. ${MarketplaceErrors.fetchGeneric}`);
    await setWarehouses(apiWarehouses.response.data.warehouseList, date);
    await updateWarehouseSheets(parseSpreadsheetIds(process.env.GOOGLE_DEFAULT_SHEETS), apiWarehouses.response.data.warehouseList, sheetName);
});
// тут уже можно баловаться с cronExpression и логикой (когда отправлять в таблицы, как часто)
