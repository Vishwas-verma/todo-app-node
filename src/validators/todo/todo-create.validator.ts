import { BaseValidator } from "../base.validator";

export class TodoCreateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "todo/todo-create.schema.json";
    }
}
