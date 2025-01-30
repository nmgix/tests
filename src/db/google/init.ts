import { google } from "googleapis";
const fs = require("fs");

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"];
export const authClient = new google.auth.GoogleAuth({
    credentials: JSON.parse(fs.readFileSync("credentials.json")),
    scopes: SCOPES,
});

google.options({
    auth: authClient,
});
