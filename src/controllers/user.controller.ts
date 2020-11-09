import { Request, Response } from "express";

export class UserController {
  static async test(req: Request, res: Response) {
    return res.json({
      type: "success"
    });
  }
}
