import { APP_IDENTIFIER, ENV_ENVIRONMENT, ENV_SENTRY_DSN } from "../../util/secrets.util";
import { SentryService } from "@devslane/sentry-service-node";
import logger from "../../util/logger.util";

class SentryFactory {
    static getInstance(): SentryService {
        logger.silly(`[${APP_IDENTIFIER}] SentryFactory getInstance()`);
        return SentryService.create({
            sentryDSN: ENV_SENTRY_DSN,
            serverId: "the-only-server", // TODO: Change me or Remove me
            environment: `${ENV_ENVIRONMENT}`
        });
    }
}

export const sentryService = SentryFactory.getInstance();
