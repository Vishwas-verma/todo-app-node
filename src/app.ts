import express, { Request, Response } from "express";
import compression from "compression";
import { ENV_APP_PORT_REST } from "./util/secrets.util";
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
import { Helpers } from "./util/helpers.util";
import { RouteNotFoundException } from "./exceptions/commons/route-not-found.exception";
import { AuthController } from "./controllers/auth.controller";
import { userMiddleware } from "./middlewares/user.middleware";
import { TodoController } from "./controllers/todo.controller";
import { errorHandler } from "./util/error-handler.util";

export class Application {
  private readonly APP: express.Application;
  private readonly PORT: number;

  private readonly ALLOWED_ORIGINS = [
    "http://localhost:3000", // Default Angular dev url.
    "http://localhost:4200", // Default Angular dev url.
    // TODO Add dashboard url here.
  ];

  constructor(port: number) {
    this.APP  = express();
    this.PORT = port;

    this.setupCORS();
    this.initGlobalMiddleware();
    this.initServices();
    this.initRoutes();
  }

  start(): void {
    this.APP.listen(this.PORT, () => {
      console.log(`App Started on PORT: ${this.PORT}`);
    });
  }

  private setupCORS(): void {
    this.APP.use(cors({
      origin        : (origin, callback) => {
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

  // Express configuration
  private initGlobalMiddleware(): void {
    this.APP.set("port", process.env.PORT || ENV_APP_PORT_REST);
    this.APP.use(bodyParser.json());
    this.APP.use(bodyParser.urlencoded({extended: true}));
    this.APP.use(compression({
      level: 3
    }));

    // if (IS_PRODUCTION) {
    //     this.APP.use(appErrorHandler());
    // }
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
    this.APP.use("/public", express.static("public", {maxAge: 31557600000}));

    this.APP.get("/test", (req: Request, res: Response) => {
      return res.json({
        "success": "ROUTE53"
      });
    });


    this.APP.get("/test/abc123", errorHandler((req: express.Request, res: express.Response) => {
      return res.json({
        "success": true
      });
    }));

    this.APP.get("/test/53v4OJJsyODVXdG88ua7P0Ki", errorHandler(async (req: express.Request, res: express.Response) => {
      return res.json({
        "success": true
      });
    }));
    this.APP.post("/login", errorHandler(AuthController.authenticate));

    this.APP.get("/me", userMiddleware, errorHandler(AuthController.me));

    this.APP.get("/todos", [userMiddleware], errorHandler(TodoController.indexTodo));
    this.APP.get("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.showTodo));
    this.APP.post("/todos", [userMiddleware], errorHandler(TodoController.createTodo));
    this.APP.put("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.updateTodo));
    this.APP.delete("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.deleteTodo));


    this.APP.all("*", (req: express.Request, res: express.Response) => Helpers.handleError(res, new RouteNotFoundException()));
  }
}
