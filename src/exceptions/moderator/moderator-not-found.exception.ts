import { ModelNotFoundException } from "../commons/model-not-found.exception";
import { ApiErrorCode } from "../commons/http.exception";

export class ModeratorNotFoundException extends ModelNotFoundException {
    protected static readonly MESSAGE = "requested moderator was not found.";

    constructor() {
        super(ModeratorNotFoundException.MESSAGE, ApiErrorCode.MODERATOR_NOT_FOUND);
    }
}
