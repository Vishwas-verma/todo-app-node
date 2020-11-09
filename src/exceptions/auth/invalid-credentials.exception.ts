import { UnauthorizedException } from "../commons/unauthorized.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class InvalidCredentialsException extends UnauthorizedException {
    private static MESSAGE = "entered email or password is incorrect.";

    constructor() {
        super(InvalidCredentialsException.MESSAGE, ApiErrorCode.AUTH_CREDENTIALS_INVALID);
    }
}
