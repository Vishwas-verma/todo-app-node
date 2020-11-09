import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Todo } from "../models/todo.model";

export class TodoTransformer extends TransformerAbstract<Todo> {
  protected _map(todo: Todo): Dictionary<any> {
    return {
      id         : todo.id,
      step_id    : todo.user_id,
      title      : todo.title,
      description: todo.description
    };
  }
}
