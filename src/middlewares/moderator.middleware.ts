import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/factories/jwt.service";
import { moderatorService } from "../services/entities/moderator.service";
import { USER_TYPE_MODERATOR } from "../util/constants.util";
import { JwtInvalidPayloadException } from "../exceptions/jwt/jwt-invalid-payload.exception";
import { ModeratorNotFoundException } from "../exceptions/moderator/moderator-not-found.exception";
import { JwtInvalidTokenException } from "../exceptions/jwt/jwt-invalid-token.exception";
import { BaseJwtPayload } from "@devslane/jwt-service-node";

export const moderatorMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization;

    let payload: BaseJwtPayload;

    try {
        payload = jwtService.parseToken(jwtToken);
    } catch (e) {
        throw new JwtInvalidTokenException();
    }
    if (jwtService.isUserJwtPayload(payload)) {
        throw new JwtInvalidPayloadException();
    }

    if (payload.type !== USER_TYPE_MODERATOR) {
        throw new JwtInvalidPayloadException();
    }

    const moderator = await moderatorService.showById(+payload.sub);

    if (!moderator) {
        throw new ModeratorNotFoundException();
    }

    req.moderator = moderator;

    next();
};
