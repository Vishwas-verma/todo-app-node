import logger from "../../util/logger.util";
import { Todo } from "../../models/todo.model";
import { TodoUpdateDto } from "../../dtos/todo/todo-update.dto";
import { TodoCreateDto } from "../../dtos/todo/todo-create.dto";
import { APP_IDENTIFIER } from "../../util/secrets.util";

class TodoService {

  private constructor() {
    logger.silly(`[${APP_IDENTIFIER}] Service`);
  }

  static getInstance(): TodoService {
    return new TodoService();
  }

  async show(todoId: number): Promise<Todo> {
    return Todo.findOne({
      where: {
        id: todoId
      }
    });
  }

  async index(): Promise<Todo[]> {
    return Todo.findAll();
  }

  async create(data: TodoCreateDto, userId: number): Promise<Todo> {
    console.log(userId);
    return  Todo.create({
      ...data,
      created_by: userId,
    });
  }

  async update(todo: Todo, data: TodoUpdateDto, userId: number): Promise<Todo> {
    todo = await todo.update({
      ...data,
      updated_by: userId
    });
    return todo;
  }

  async delete(todo: Todo): Promise<any> {
    return todo.destroy();
  }
}

export const todoService = TodoService.getInstance();
