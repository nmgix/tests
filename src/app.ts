import "#shared/dotenv.ts";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";

import { logger } from "#logger.ts";
import { AppErrors } from "#shared/errors.messages.ts";

import db from "#db/sql/knex.ts";
import "#db/google/init.ts";

import { fetchTariffs } from "#services/marketplace.ts";

const app = express();
app.use(express.json());
app.use(cors());
const rateLimiter = rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 1000,
    message: AppErrors.rateLimit,
});
app.use(rateLimiter);
app.get("/health", async (_req, res) => {
    try {
        await db.raw("SELECT 1");
        res.json({ status: "ok", database: "connected" });
    } catch (error) {
        logger.error(`${AppErrors.healthCheck}: `, error);
        res.status(500).json({ status: "error", database: "disconnected" });
    }
});
logger.debug(`app is running, timestamp: ` + new Date().getMilliseconds());

app.get("/testreq", async (_req, res) => {
    const data = await fetchTariffs();
    return res.json(data);
});

export default app;
