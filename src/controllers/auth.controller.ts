import { NextFunction, Request, Response } from "express";
import { BaseController } from "./base.controller";
import { UnprocessableEntityException } from "../exceptions/commons/unprocessable-entity.exception";
import { userService } from "../services/entities/user.service";
import { cryptService } from "../services/factories/crypt.service";
import { InvalidCredentialsException } from "../exceptions/auth/invalid-credentials.exception";
import { UserTransformer } from "../transformers/user.transformer";
import { AuthLoginValidator } from "../validators/auth/auth-login.validator";
import { AuthLoginDto } from "../dtos/auth/auth-login.dto";
import { UserAlreadyExistsException } from "../exceptions/user/user-already-exists.exception";
import { UserCreateValidator } from "../validators/user/user-create.validator";

export class AuthController extends BaseController {
  static async me(req: Request, res: Response) {
    return res.json({
      user: await new UserTransformer().transform(req.user)
    });
  }

  static async login(req: Request, res: Response) {
    const inputData = req.body as AuthLoginDto;

    try {
      await (new AuthLoginValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }

    const user = await userService.showByEmail(inputData.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (!cryptService.compareHashSync(inputData.password, user.password)) {
      throw new InvalidCredentialsException();
    }

    return res.json({
      user : await new UserTransformer().transform(user),
      token: userService.createJWTToken(user)
    });
  }

    static async signup(req: Request, res: Response, next: NextFunction) {
        const inputData = req.body as any;

        try {
            await (new UserCreateValidator().validate(inputData));
        } catch (e) {
            throw new UnprocessableEntityException(e);
        }

        const user = await userService.showByEmail(inputData.email);
        if (user) {
            throw new UserAlreadyExistsException();
        }

        const newUser = await userService.create(inputData);
        res.json({
            data: await (new UserTransformer()).transform(newUser),
        });
   }
}
