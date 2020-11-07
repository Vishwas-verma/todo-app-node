import express from "express";
import { errorHandler } from "../util/error-handler.util";
import { StepController } from "../controllers/step.controller";
import { methodNotFoundHandler } from "../util/method-not-found-handler.util";
import { TokenController } from "../controllers/todo.controller";
import { moderatorMiddleware } from "../middlewares/moderator.middleware";
import { ModeratorController } from "../controllers/moderator.controller";
import { OptionController } from "../controllers/option.controller";

const router = express.Router();

router.use(errorHandler(moderatorMiddleware));

router.route("/me")
    .get(errorHandler(ModeratorController.me))
    .all(methodNotFoundHandler);

router.route("/options/:optionId(\\d+)")
    .put(errorHandler(OptionController.update))
    .delete(errorHandler(OptionController.destroy));

router.route("/options/:stepId(\\d+)")
    .get(errorHandler(OptionController.index));

router.route("/steps")
    .get(errorHandler(StepController.index))
    .post(errorHandler(StepController.create))
    .all(methodNotFoundHandler);

router.route("/steps/re-arrange")
    .post(errorHandler(StepController.rearrange))
    .all(methodNotFoundHandler);

router.route("/steps/:stepId(\\d+)")
    .put(errorHandler(StepController.update))
    .delete(errorHandler(StepController.destroy))
    .all(methodNotFoundHandler);

router.route("/steps/:stepId(\\d+)/tokens")
    .get(errorHandler(TokenController.index))
    .post(errorHandler(TokenController.create))
    .all(methodNotFoundHandler);

router.route("/tokens/:tokenId(\\d+)")
    .put(errorHandler(TokenController.update))
    .delete(errorHandler(TokenController.destroy))
    .all(methodNotFoundHandler);

router.route("/steps/:stepId(\\d+)/options")
    .post(errorHandler(OptionController.create));

export const moderatorRoutes = router;
