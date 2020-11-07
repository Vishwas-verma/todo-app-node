import { ModelNotFoundException } from "../commons/model-not-found.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class UserNotFoundException extends ModelNotFoundException {
    private static MESSAGE = "requested user was not found";

    constructor() {
        super(UserNotFoundException.MESSAGE, ApiErrorCode.USER_NOT_FOUND);
    }
}
