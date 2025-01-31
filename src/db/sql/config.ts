import "../../shared/dotenv";
import { logger } from "../../logger";
import { Knex } from "knex";
import path from "path";

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

logger.debug(`DB hosts (env check): ${process.env.DB_HOST}`);

const config: { [key in Exclude<typeof process.env.NODE_ENV, undefined>]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "+03:00",
        },
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
    },
    production: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "+03:00",
        },
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
    },
    test: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            timezone: "+03:00",
        },
        migrations: {
            directory: path.join(__dirname, "./migrations"),
        },
    },
};

export default config;
