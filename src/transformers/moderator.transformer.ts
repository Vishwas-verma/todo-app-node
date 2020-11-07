import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Moderator } from "../models/moderator.model";

export class ModeratorTransformer extends TransformerAbstract<Moderator> {
    protected _map(moderator: Moderator): Dictionary<any> {
        return {
            id: moderator.id,
            first_name: moderator.first_name,
            last_name: moderator.last_name,
            email: moderator.email
        };
    }
}
