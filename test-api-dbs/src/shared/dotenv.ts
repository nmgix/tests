import path from "path";
import dotenv from "dotenv";
import findUp from "find-up";

const dbEnvFile = process.env.NODE_ENV === "production" ? "db.prod.env" : "db.dev.env";

// ибо при миграциях не находит файлы
const envPath = findUp.sync(".env", { cwd: __dirname }) || path.resolve(__dirname, "../../.env");
const dbEnvPath = findUp.sync("db.env", { cwd: __dirname }) || path.resolve(__dirname, `../../${dbEnvFile}`);
dotenv.config({ path: [envPath, dbEnvPath] });
