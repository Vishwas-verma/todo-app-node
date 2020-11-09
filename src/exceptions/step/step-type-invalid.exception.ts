import { ApiErrorCode } from "../commons/http.exception";
import { UnauthorizedException } from "../commons/unauthorized.exception";

export class StepTypeInvalidException extends UnauthorizedException {
    private static readonly MESSAGE = "Requested operation cannot be performed on current step type...";

    constructor() {
        super(StepTypeInvalidException.MESSAGE, ApiErrorCode.STEP_TYPE_INVALID);
    }
}
