import * as winston from "winston";
import { ENV_SENTRY_DSN, APP_ENV } from "./secrets.util";
import appRoot from "app-root-path";
import Sentry from "winston-sentry-log";


const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      winston.format.simple(),
      winston.format.printf(info => `${info.level} ${info.timestamp}: ${info.message}`)
    ),
    transports: [
        new winston.transports.File({
            format: winston.format.json(),
            level: "info",
            filename: `${appRoot}/logs/info.log`,
        }),
        new winston.transports.File({
            format: winston.format.json(),
            level: "error",
            filename: `${appRoot}/logs/error.log`,
        }),
    ]
});

if (APP_ENV !== "production") {
    logger.add(new winston.transports.Console({
        level: "silly"
    }));
} else {
    logger.add(new Sentry({
        config: {
            dsn: ENV_SENTRY_DSN
        },
        level: "info"
    }));
}

// https://github.com/winstonjs/winston/issues/1427
export default logger;
