import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/factories/jwt.service";
import { BaseJwtPayload } from "@devslane/jwt-service-node";
import { userService } from "../services/entities/user.service";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";
import { HEADER_AUTHORIZATION } from "../util/constants.util";
import { JwtInvalidPayloadException } from "../exceptions/jwt/jwt-invalid-payload.exception";
import { JwtInvalidTokenException } from "../exceptions/jwt/jwt-invalid-token.exception";
import { errorHandler } from "../util/error-handler.util";

export const userMiddleware = errorHandler(async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers[HEADER_AUTHORIZATION];

    let payload: BaseJwtPayload;

    try {
        payload = jwtService.parseToken(jwtToken);
    } catch (e) {
        throw new JwtInvalidTokenException();
    }

    if (!jwtService.isUserJwtPayload(payload)) {
        throw new JwtInvalidPayloadException();
    }

    const user = await userService.showById(+payload.sub);

    if (!user) {
        throw new UserNotFoundException();
    }

    req.user = user;

    next();
});
