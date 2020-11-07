import { NextFunction, Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { todoService } from "../services/entities/todo.service";
import { TodoCreateDto } from "../dtos/todo/todo-create.dto";
import { UnprocessableEntityException } from "../exceptions/commons/unprocessable-entity.exception";
import { TodoTransformer } from "../transformers/todo.transformer";
import { TodoUpdateDto } from "../dtos/todo/todo-update.dto";
import { TodoCreateValidator } from "../validators/todo/todo-create.validator";
import { TodoUpdateValidator } from "../validators/todo/todo-update.validator";

export class TodoController {

  static async indexTodo(req: Request, res: Response, next: NextFunction) {
    const todos = await todoService.index();
    return res.json({
      data: await (new TodoTransformer()).transformList(todos),
    });
  }


  static async createTodo(req: Request, res: Response, next: NextFunction) {
    const inputData = req.body as TodoCreateDto;
    const userId    = req.user.id;

    try {
      await (new TodoCreateValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    const newTodo = await todoService.create(inputData, userId);
    res.json({
      data: await (new TodoTransformer()).transform(newTodo)
    });
  }

  static async showTodo(req: Request, res: Response, next: NextFunction) {
    const todoId = +req.params.todoId;
    const todo   = await todoService.show(todoId);

    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found"
      });
    }

    return res.json({
      data: await new TodoTransformer().transform(todo)
    });
  }

  static async updateTodo(req: Request, res: Response, next: NextFunction) {
    const todoId    = +req.params.todoId;
    const todo      = await todoService.show(todoId);
    const inputData = req.body as TodoUpdateDto;
    const userId    = req.user.id;

    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found"
      });
    }

    try {
      await (new TodoUpdateValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }
    let updatedTodo: Todo;
    try {
      updatedTodo = await todoService.update(todo, inputData, userId);
    } catch (e) {
      throw e;
    }
    res.json({
      data: await new TodoTransformer().transform(updatedTodo)
    });
  }

  static async deleteTodo(req: Request, res: Response, nest: NextFunction) {
    const todoId = +req.params.todoId;
    const todo   = await todoService.show(todoId);
    if (!todo) {
      return res.status(404).json({
        message: "Todo Not Found"
      });
    }
    await todoService.delete(todo);
    return res.status(200).json("Success");
  }
}
