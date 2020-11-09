import { BaseValidator } from "../base.validator";

export class AuthLoginValidator extends BaseValidator {
    protected getSchemaName(): string {
        return "auth/auth-login.schema.json";
    }
}
