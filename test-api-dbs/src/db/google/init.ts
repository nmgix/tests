import { google } from "googleapis";
import fs from "fs";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/drive"];
export const authClient = new google.auth.GoogleAuth({
    credentials: JSON.parse(fs.readFileSync("credentials.json", "utf8")),
    scopes: SCOPES,
});

google.options({
    auth: authClient,
});
