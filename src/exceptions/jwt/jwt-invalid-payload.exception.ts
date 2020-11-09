import { UnauthorizedException } from "../commons/unauthorized.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class JwtInvalidPayloadException extends UnauthorizedException {
    private static MESSAGE = "Invalid JWT Payload";

    constructor() {
        super(JwtInvalidPayloadException.MESSAGE, ApiErrorCode.JWT_INCORRECT_PAYLOAD_TYPE);
    }
}
