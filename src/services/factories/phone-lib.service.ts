import { PhoneLibService } from "@devslane/phone-lib-service-node";
import logger from "../../util/logger.util";
import { APP_IDENTIFIER } from "../../util/secrets.util";

class PhoneLibFactory {
    static getInstance(): PhoneLibService {
        logger.silly(`[${APP_IDENTIFIER}] PhoneLibFactory getInstance()`);
        return PhoneLibService.create();
    }
}

export const phoneLibService = PhoneLibFactory.getInstance();
