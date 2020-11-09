import { UnauthorizedException } from "../commons/unauthorized.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class JwtInvalidTokenException extends UnauthorizedException {
    private static MESSAGE = "Invalid Token";

    constructor() {
        super(JwtInvalidTokenException.MESSAGE, ApiErrorCode.JWT_INVALID);
    }
}
