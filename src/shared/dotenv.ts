import path from "path";
import dotenv from "dotenv";

const dotenvConfig = { path: [path.resolve(process.cwd(), `.env`), path.resolve(process.cwd(), `db.env`)] };
dotenv.config(dotenvConfig);
