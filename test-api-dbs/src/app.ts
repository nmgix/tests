import "./shared/dotenv";
import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";

import { logger } from "./logger";
import { AppErrors } from "./shared/errors.messages";

import "./db/google/init";

import { healthRouter } from "./controllers/health";
import { marketplaceRouter } from "./controllers/marketplace";
import { googleRouter } from "./controllers/google";
import { printRoutes } from "./shared/app";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
    rateLimit({
        windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
        limit: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 5,
        message: AppErrors.rateLimit,
    }),
);

app.use("/health", healthRouter);
app.use("/marketplace", marketplaceRouter);
app.use("/google", googleRouter);
app._router.stack.forEach(function (r: any) {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});
printRoutes(app);

logger.debug(`app is running, timestamp: ` + new Date().getMilliseconds());

export default app;
