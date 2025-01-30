import "#shared/dotenv.ts";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
// import bodyParser from "body-parser";

import { logger } from "#logger.ts";
import { AppErrors } from "#shared/errors.messages.ts";

import "#db/google/init.ts";

import { healthRouter } from "#controllers/health.ts";
import { marketplaceRouter } from "#controllers/marketplace.ts";
import { googleRouter } from "#controllers/google.ts";

const app = express();
app.use(express.json());
app.use(cors());
app.use(
    rateLimit({
        windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
        limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
        message: AppErrors.rateLimit,
    }),
);
// app.use(bodyParser())

app.use("/health", healthRouter);
app.use("/marketplace", marketplaceRouter);
app.use("/google", googleRouter);

logger.debug(`app is running, timestamp: ` + new Date().getMilliseconds());

export default app;
