import { ValidatorService } from "@devslane/validator-service-node";
import logger from "../../util/logger.util";
import { APP_IDENTIFIER } from "../../util/secrets.util";

class ValidatorFactory {
    private static _instance: ValidatorService;

    static getInstance(): ValidatorService {
        logger.silly(`[${APP_IDENTIFIER}] ValidatorFactory getInstance()`);

        this._instance = ValidatorService.init({
            baseSchemaPath: "schema"
        });

        // Add Custom Keywords here...
        // this._instance.registerKeywords([
        //     phoneNumberKeyword,
        // ]);
        return this._instance;
    }
}

export const validatorService = ValidatorFactory.getInstance();
