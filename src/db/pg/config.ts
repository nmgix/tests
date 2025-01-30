import { Knex } from "knex";
import dotenv from "dotenv";
import path from "path";

const envPath = path.resolve(process.cwd(), "../..", `.env`);
dotenv.config({ path: envPath });

const config: { [key in typeof process.env.NODE_ENV]: Knex.Config } = {
    development: {
        client: "pg",
        connection: {
            host: process.env.DB_HOST,
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
