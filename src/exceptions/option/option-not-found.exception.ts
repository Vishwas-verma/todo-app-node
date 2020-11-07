import { ModelNotFoundException } from "../commons/model-not-found.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class OptionNotFoundException extends ModelNotFoundException {
    private static MESSAGE = "requested option was not found";

    constructor() {
        super(OptionNotFoundException.MESSAGE, ApiErrorCode.OPTION_NOT_FOUND);
    }
}
