import { ApiErrorCode } from "../commons/http.exception";
import { UnprocessableEntityException } from "../commons/unprocessable-entity.exception";

export class StepRearrangeMissingException extends UnprocessableEntityException {
    constructor() {
        super(null, "some steps are missing from the re-ordered list...", ApiErrorCode.STEP_REARRANGE_MISSING);
    }
}
