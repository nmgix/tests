import cron from "node-cron";
import "#shared/dotenv.ts";
import { parseSpreadsheetIds } from "#db/google/methods.ts";
import { updateWarehouseSheets } from "#services/google.ts";
import { warehouseList } from "#shared/mockdata.ts";
// import { fetchDataAndSaveToDB, exportToGoogleSheets } from './services';

cron.schedule("0 * * * *", async () => {
    const sheetName = process.env.GOOGLE_SHEET_NAME || "stocks_coefs";
    //   await fetchDataAndSaveToDB();
    //   await exportToGoogleSheets();
    const warehouseData = warehouseList; //потом заменится на данные из fetchFromDb
    await updateWarehouseSheets(parseSpreadsheetIds(process.env.GOOGLE_DEFAULT_SHEETS), warehouseData, sheetName);
});
