import path from "path";
import dotenv from "dotenv";
import findUp from "find-up";
// ибо при миграциях не находит файлы
const envPath = findUp.sync(".env", { cwd: __dirname }) || path.resolve(__dirname, "../../.env");
const dbEnvPath = findUp.sync("db.env", { cwd: __dirname }) || path.resolve(__dirname, "../../db.env");
dotenv.config({ path: [envPath, dbEnvPath] });
