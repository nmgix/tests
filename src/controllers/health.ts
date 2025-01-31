import express from "express";
import db from "../db/sql/knex";
import { logger } from "../logger";
import { AppErrors } from "../shared/errors.messages";

const healthRouter = express.Router();
healthRouter.get("/", async (_req, res) => {
    try {
        await db.raw("SELECT 1");
        logger.info("DB health: OK");
        res.json({ status: "ok", database: "connected" });
    } catch (error) {
        logger.error(`${AppErrors.healthCheck}: `, error);
        res.status(500).json({ status: "error", database: "disconnected" });
    }
});
export { healthRouter };
