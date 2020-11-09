import { ApiErrorCode } from "../commons/http.exception";
import { ModelAlreadyExistsException } from "../commons/model-already-exists.exception";

export class UserAlreadyExistsException extends ModelAlreadyExistsException {
    private static MESSAGE = "user with this email address already exists. Try logging in instead.";

    constructor() {
        super(UserAlreadyExistsException.MESSAGE, ApiErrorCode.USER_ALREADY_EXISTS);
    }
}
