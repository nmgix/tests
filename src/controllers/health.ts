import express from "express";
import db from "#db/sql/knex.ts";
import { logger } from "#logger.ts";
import { AppErrors } from "#shared/errors.messages.ts";

const healthRouter = express.Router();
healthRouter.get("/", async (_req, res) => {
    try {
        await db.raw("SELECT 1");
        res.json({ status: "ok", database: "connected" });
    } catch (error) {
        logger.error(`${AppErrors.healthCheck}: `, error);
        res.status(500).json({ status: "error", database: "disconnected" });
    }
});
export { healthRouter };
