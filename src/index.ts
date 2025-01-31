import { logger } from "#logger.ts";
import app from "./app.ts";
import "./cron.ts";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    const msg = `Server is running at http://localhost:${PORT}`;
    logger.info(msg);
});
