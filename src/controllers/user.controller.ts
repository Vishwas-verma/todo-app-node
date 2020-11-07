import { Request, Response } from "express";
import { UserCreateValidator } from "../validators/user/user-create.validator";
import { UserCreateDto } from "../dtos/user/user-create.dto";
import { UnprocessableEntityException } from "../exceptions/commons/unprocessable-entity.exception";
import { userService } from "../services/entities/user.service";
import { UserTransformer } from "../transformers/user.transformer";
import { UserAlreadyExistsException } from "../exceptions/user/user-already-exists.exception";
import { stepService } from "../services/entities/step.service";
import { SortOrder } from "../enums/sort-order.enum";

export class UserController {
    static async test(req: Request, res: Response) {
        return res.json({
            type: "success"
        });
    }

    static async signUp(req: Request, res: Response) {
        const inputData = req.body as UserCreateDto;

        try {
            await (new UserCreateValidator().validate(inputData));
        } catch (e) {
            throw new UnprocessableEntityException(e);
        }

        const user = await userService.showByEmail(inputData.email);

        if (user) {
            throw new UserAlreadyExistsException();
        }

        const firstStep = await stepService.showLastStep(SortOrder.ASC);

        const newUser = await userService.create({
            ...inputData,
            current_step_id: firstStep.id
        });

        const newToken = userService.createJWTToken(newUser);

        return res.json({
            user: await new UserTransformer().transform(newUser, ["current_step"]),
            token: newToken
        });
    }
}
