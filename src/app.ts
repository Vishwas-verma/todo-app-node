import express from "express";
import compression from "compression";
import { apiRoutes } from "./routes/api.route";
import { snsHeaderMiddleware } from "@devslane/sns-service-node";
import { ENV_ENVIRONMENT } from "./util/secrets.util";
import { ENVIRONMENT_PRODUCTION } from "./util/constants.util";
import errorHandler from "errorhandler";
import cors from "cors";
import bodyParser from "body-parser";
import * as _ from "lodash";
import { dbService } from "./services/db.service";
import { mattermostService } from "./services/mattermost.service";
import { userService } from "./services/entities/user.service";
import { cryptService } from "./services/factories/crypt.service";
import { jwtService } from "./services/factories/jwt.service";
import { phoneLibService } from "./services/factories/phone-lib.service";
import { s3Service } from "./services/factories/s3.service";
import { sentryService } from "./services/factories/sentry.service";
import { snsService } from "./services/factories/sns.service";
import { validatorService } from "./services/factories/validator.service";

export class Application {
    private readonly APP: express.Application;
    private readonly PORT: number;

    private readonly ALLOWED_ORIGINS = [
        "http://localhost:3000", // Default Angular dev url.
        "http://localhost:4200", // Default Angular dev url.
        // TODO Add dashboard url here.
    ];

    constructor(port: number) {
        this.APP = express();
        this.PORT = port;

        this.setupCORS();
        this.initGlobalMiddleware();
        this.initServices();
        this.initRoutes();
    }

    private setupCORS(): void {
        this.APP.use(cors({
            origin: (origin, callback) => {
                if (!origin || _.includes(this.ALLOWED_ORIGINS, origin)) {
                    callback(undefined, true);
                } else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
            exposedHeaders: ["Content-Disposition"]
        }));

        this.APP.options("*");
    }

    private initGlobalMiddleware(): void {
        this.APP.use(snsHeaderMiddleware);
        this.APP.use(bodyParser.json());
        this.APP.use(bodyParser.urlencoded({ extended: true }));

        this.APP.use(compression());

        if (ENV_ENVIRONMENT !== ENVIRONMENT_PRODUCTION) {
            this.APP.use(errorHandler());
        }
    }

    private initServices(): void {
        // Entities
        userService;

        // Factories
        cryptService;
        jwtService;
        phoneLibService;
        s3Service;
        sentryService;
        snsService;
        validatorService;

        // Services
        dbService;
        mattermostService;
    }

    private initRoutes(): void {
        this.APP.use(apiRoutes);
    }

    start(): void {
        this.APP.listen(this.PORT, () => {
            console.log(`App Started on PORT: ${this.PORT}`);
        });
    }
}
