import log4js, { Configuration } from "log4js";

const config: Configuration = {
    appenders: {
        app: { type: "file", maxLogSize: 10485760, backups: 3, filename: "logs/app.log", compress: false },
        errorFile: {
            type: "file",
            filename: "logs/errors.log",
        },
        errors: {
            type: "logLevelFilter",
            level: "error",
            appender: "errorFile",
        },
        console: {
            type: "console",
        },
    },
    categories: { default: { appenders: ["app", "errors", "console"], level: "debug" } },
};

log4js.configure(config);

export const logger = log4js.getLogger("file");
