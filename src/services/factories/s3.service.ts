import {
    APP_IDENTIFIER,
    ENV_S3_BUCKET,
    ENV_S3_BUCKET_AUDIO,
    ENV_S3_KEY,
    ENV_S3_REGION,
    ENV_S3_SECRET
} from "../../util/secrets.util";
import logger from "../../util/logger.util";
import { S3Service } from "@devslane/s3-service-node";

class S3Factory {
    static getInstance(): S3Service {
        logger.silly(`[${APP_IDENTIFIER}] S3Factory getInstance()`);
        return S3Service.init({
            credentials: {
                key: ENV_S3_KEY,
                secret: ENV_S3_SECRET
            },

            buckets: {
                audio: {
                    key: ENV_S3_BUCKET_AUDIO,
                    region: ENV_S3_REGION
                },
                video: {
                    key: undefined,
                    region: undefined
                }
            },

            internalBucket: {
                key: ENV_S3_BUCKET,
                region: ENV_S3_REGION
            }
        });
    }
}

export const s3Service = S3Factory.getInstance();
