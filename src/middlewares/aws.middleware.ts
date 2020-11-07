import { NextFunction, Request, Response } from "express";
import { ENV_AWS_ACCESS_TOKEN } from "../util/secrets.util";
import { HEADER_ACCESS_TOKEN } from "../util/constants.util";

export const awsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.query[HEADER_ACCESS_TOKEN];

    if (accessToken !== ENV_AWS_ACCESS_TOKEN) {
        res.statusCode = 401;
        return res.json({
            message: "Unauthorized"
        });
    }

    next();
};
