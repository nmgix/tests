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
    },
    categories: { default: { appenders: ["app", "errors"], level: "debug" } },
};

log4js.configure(config);

export const logger = log4js.getLogger("file");

// export const loggerinfo = log4js.getLogger("info"); // initialize the var to use.
// export const loggererror = log4js.getLogger("error"); // initialize the var to use.
// export const loggerdebug = log4js.getLogger("debug"); // initialize the var to use.

// loggerinfo.info("This is Information Logger");
// loggererror.info("This is Error Logger");
// loggerdebug.info("This is Debugger");
