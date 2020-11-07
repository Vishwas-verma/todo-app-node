import { ApiErrorCode } from "../commons/http.exception";
import { UnauthorizedException } from "../commons/unauthorized.exception";

export class StepNotCurrentException extends UnauthorizedException {
    private static MESSAGE = "please complete previous steps before completing this step...";

    constructor() {
        super(StepNotCurrentException.MESSAGE, ApiErrorCode.STEP_NOT_FOUND);
    }
}
