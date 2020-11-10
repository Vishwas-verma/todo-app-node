import dotenv from "dotenv";
import { FILEPATH_ENV } from "./constants.util";

dotenv.config({path: FILEPATH_ENV});

export const ENV_ENVIRONMENT = process.env.NODE_ENV;
export const APP_ENV         = process.env.APP_ENV;
export const IS_PRODUCTION = APP_ENV === "production"; // Anything else is treated as "dev"

export const APP_IDENTIFIER    = process.env.APP_IDENTIFIER;
export const ENV_APP_PORT_REST = +process.env.APP_PORT_REST;

export const ENV_MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
export const ENV_MYSQL_USER     = process.env.MYSQL_USER;
export const ENV_MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
export const ENV_MYSQL_DB       = process.env.MYSQL_DB;

export const ENV_S3_KEY          = process.env.S3_KEY;
export const ENV_S3_SECRET       = process.env.S3_SECRET;
export const ENV_S3_BUCKET       = process.env.S3_BUCKET;
export const ENV_S3_REGION       = process.env.S3_REGION;
export const ENV_S3_BUCKET_AUDIO = process.env.S3_BUCKET_AUDIO;

export const ENV_JWT_SECRET = process.env.JWT_SECRET;

export const ENV_ERROR_WEBHOOK = process.env.ERROR_WEBHOOK;

export const ENV_CRYPT_KEY = process.env.CRYPT_KEY;
export const ENV_CRYPT_IV  = process.env.CRYPT_IV;

export const ENV_AWS_ACCESS_TOKEN = process.env.AWS_ACCESS_TOKEN;

export const ENV_SENTRY_DSN = process.env.SENTRY_DSN;



