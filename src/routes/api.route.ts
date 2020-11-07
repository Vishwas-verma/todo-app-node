import express from "express";
import { UserController } from "../controllers/user.controller";
import { errorHandler } from "../util/error-handler.util";
import { RouteNotFoundException } from "../exceptions/commons/route-not-found.exception";
import { AuthController } from "../controllers/auth.controller";
import { methodNotFoundHandler } from "../util/method-not-found-handler.util";
import { userMiddleware } from "../middlewares/user.middleware";
import { TodoController } from "../controllers/todo.controller";

const router = express.Router();

router.post("/test", errorHandler(UserController.test));

router.route("/sign-up")
    .post(errorHandler(UserController.signUp))
    .all(methodNotFoundHandler);

router.route("/login")
    .post(errorHandler(AuthController.login))
    .all(methodNotFoundHandler);

router.get("/me", userMiddleware, errorHandler(AuthController.me));

router.get("/todos", [userMiddleware], errorHandler(TodoController.indexTodo));
router.get("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.showTodo));
router.post("/todos", [userMiddleware], errorHandler(TodoController.createTodo));
router.put("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.updateTodo));
router.delete("/todos/:todoId([0-9]+)", [userMiddleware], errorHandler(TodoController.deleteTodo));

router.all("*", errorHandler(() => {
    throw new RouteNotFoundException();
}));

export const apiRoutes = router;
