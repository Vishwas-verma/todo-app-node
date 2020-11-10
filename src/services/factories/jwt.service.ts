import { JwtService } from "@devslane/jwt-service-node";
import { APP_IDENTIFIER, ENV_JWT_SECRET } from "../../util/secrets.util";
import logger from "../../util/logger.util";

class JwtFactory {
    static getInstance(): JwtService {
        logger.silly(`[${APP_IDENTIFIER}] JwtFactory getInstance()`);
        return JwtService.create({
            jwtIssuer: APP_IDENTIFIER,
            jwtSecret: ENV_JWT_SECRET,
            expiryTimeMS: 30 * 24 * 60 * 60 * 1000 // 7 Days in ms
        });
    }
}

export const jwtService = JwtFactory.getInstance();
