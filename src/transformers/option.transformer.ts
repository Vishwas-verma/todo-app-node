import { TransformerAbstract } from "./transformer.abstract";
import { Dictionary } from "async";
import { Option } from "../models/option.model";

export class OptionTransformer extends TransformerAbstract<Option> {
    protected _map(option: Option): Dictionary<any> {
        return {
            id: option.id,
            step_id: option.step_id,
            title: option.title,
            is_correct: option.is_correct
        };
    }
}