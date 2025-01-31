import { logger } from "./logger";
import app from "./app";
import "./cron";

const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, "0.0.0.0", () => {
    const msg = `Server is running at http://0.0.0.0:${PORT}`;
    logger.info(msg);
});
