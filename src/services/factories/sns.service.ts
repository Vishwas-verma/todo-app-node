import logger from "../../util/logger.util";
import { SnsService } from "@devslane/sns-service-node";
import { APP_IDENTIFIER } from "../../util/secrets.util";

class SnsFactory {
    static getInstance(): SnsService {
        logger.silly(`[${APP_IDENTIFIER}] SnsFactory getInstance()`);
        return SnsService.init();
    }
}

export const snsService = SnsFactory.getInstance();
