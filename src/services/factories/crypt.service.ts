import { CryptAlg, CryptService } from "@devslane/crypt-service-node";
import { APP_IDENTIFIER, ENV_CRYPT_IV, ENV_CRYPT_KEY } from "../../util/secrets.util";
import logger from "../../util/logger.util";

class CryptFactory {
    static getInstance(): CryptService {
        logger.silly(`[${APP_IDENTIFIER}] CryptFactory getInstance()`);
        return CryptService.create({
            saltRounds: 10,
            crypt: {
                alg: CryptAlg.AES_256_CBC,
                key: ENV_CRYPT_KEY,
                iv: ENV_CRYPT_IV
            }
        });
    }
}

export const cryptService = CryptFactory.getInstance();
