import cron from "node-cron";
// import { fetchDataAndSaveToDB, exportToGoogleSheets } from './services';

cron.schedule("0 * * * *", async () => {
    //   await fetchDataAndSaveToDB();
    //   await exportToGoogleSheets();
    console.log("cron task");
});
