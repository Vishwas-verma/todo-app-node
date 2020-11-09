import { ModelNotFoundException } from "../commons/model-not-found.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class StepNotFoundException extends ModelNotFoundException {
    private static MESSAGE = "requested step was not found";

    constructor() {
        super(StepNotFoundException.MESSAGE, ApiErrorCode.STEP_NOT_FOUND);
    }
}
