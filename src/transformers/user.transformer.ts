import { TransformerAbstract } from "./transformer.abstract";
import { User } from "../models/user.model";
import { Dictionary } from "async";
import { isUndefined } from "util";
import { stepService } from "../services/entities/step.service";
import { StepTransformer } from "./step.transformer";

export class UserTransformer extends TransformerAbstract<User> {

    protected _map(user: User): Dictionary<any> {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email
        };
    }
}
