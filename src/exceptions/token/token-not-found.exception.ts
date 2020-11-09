import { ModelNotFoundException } from "../commons/model-not-found.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class TokenNotFoundException extends ModelNotFoundException {
    private static MESSAGE = "requested todo was not found";

    constructor() {
        super(TokenNotFoundException.MESSAGE, ApiErrorCode.TOKEN_NOT_FOUND);
    }
}
