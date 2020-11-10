import { NextFunction, Request, Response } from "express";
import { UnprocessableEntityException } from "../exceptions/commons/unprocessable-entity.exception";
import { userService } from "../services/entities/user.service";
import { cryptService } from "../services/factories/crypt.service";
import { UserTransformer } from "../transformers/user.transformer";
import { UserAlreadyExistsException } from "../exceptions/user/user-already-exists.exception";
import { UserCreateValidator } from "../validators/user/user-create.validator";
import { jwtService } from "../services/factories/jwt.service";
import { UserLoginValidator } from "../validators/user/user-login.validator";
import { UserNotFoundException } from "../exceptions/user/user-not-found.exception";

export class AuthController {
  static async me(req: Request, res: Response) {
    return res.json({
      user: await new UserTransformer().transform(req.user)
    });
  }

  static async authenticate(req: Request, res: Response, next: NextFunction) {
    const inputData = req.body as { email: string, password: string };
    try {
      await (new UserLoginValidator().validate(inputData));
    } catch (e) {
      throw new UnprocessableEntityException(e);
    }

    const user = await userService.showByEmail(inputData.email);

    if (!user) {
      throw new UserNotFoundException();
    }
    const isPasswordCorrect = cryptService.compareHashSync(inputData.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "Wrong Password"
      });
    }

    return res.json({
      token: jwtService.generateUserToken(user.id, {
        expires     : true,
        customClaims: null,
      }),
      user : await (new UserTransformer()).transform(user),
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
