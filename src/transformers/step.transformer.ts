import { TransformerAbstract } from "./transformer.abstract";
import { Step, StepType } from "todo.model.ts";
import { Dictionary } from "async";
import { isUndefined } from "util";
import { tokenService } from "../services/entities/todo.service";
import { TodoTransformer } from "./todo.transformer";
import * as _ from "lodash";
import { optionService } from "../services/entities/option.service";
import { OptionTransformer } from "./option.transformer";

export class StepCompactTransformer extends TransformerAbstract<Step> {
    protected _map(step: Step): Dictionary<any> {
        return {
            id: step.id,
            title: step.title,
            sort_order: step.sort_order,
        };
    }
}

export class StepTransformer extends StepCompactTransformer {
    protected async includeTokens(step: Step): Promise<Dictionary<any>> {
        if (step.type !== StepType.TEST_REARRANGE) {
            return undefined;
        }

        let tokens = step.tokens;

        if (isUndefined(tokens)) {
            tokens = await tokenService.index(step.id);
        }

        return await new TodoTransformer().transformList(tokens);
    }

    protected async includeShuffledTokens(step: Step): Promise<Dictionary<any>> {
        if (step.type !== StepType.TEST_REARRANGE) {
            return undefined;
        }

        let tokens = step.tokens;

        if (isUndefined(tokens)) {
            tokens = await tokenService.index(step.id);
        }

        return await new TodoTransformer().transformList(_.shuffle(tokens));
    }

    protected async includeCorrectOrder(step: Step): Promise<Dictionary<any>> {
        if (step.type !== StepType.TEST_REARRANGE) {
            return undefined;
        }

        let tokens = step.tokens;

        if (isUndefined(tokens)) {
            tokens = await tokenService.index(step.id);
        }

        return tokens.map(t => t.id);
    }

    protected async includeOptions(step: Step): Promise<Dictionary<any>> {
        if (step.type !== StepType.MULTI_CHOICE) {
            return undefined;
        }

        let options = step.options;

        if (isUndefined(options)) {
            options = await optionService.index(step.id);
        }

        return await new OptionTransformer().transformList(options);
    }

    protected _map(step: Step): Dictionary<any> {
        return {
            id: step.id,
            title: step.title,
            description: step.description,
            type: step.type,
            sort_order: step.sort_order,
            data: step.data
        };
    }
}
