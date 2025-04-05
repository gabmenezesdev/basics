import { StatusCodes } from "http-status-codes";
import { CreateAuthByPhoneOnlyUsecase } from "../../../domain/usecase/auth/createAuthByPhoneOnlyUsecase";
import { AuthRepository } from "../../repository/authRepository";
import { Request, Response, NextFunction } from "express";

export class CreatePhoneAuthController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber } = req.body;

    try {
      const authRepository = new AuthRepository();
      const createAuthByEmailAndPasswordUsecase =
        new CreateAuthByPhoneOnlyUsecase(authRepository);
      await createAuthByEmailAndPasswordUsecase.execute({ phoneNumber });
      res
        .status(StatusCodes.CREATED)
        .json({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
