import { BaseValidator } from "../base.validator";

export class TodoUpdateValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "todo/todo-update.schema.json";
    }
}
