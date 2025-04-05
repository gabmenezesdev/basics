import { StatusCodes } from "http-status-codes";
import { CreateAuthByEmailAndPasswordUsecase } from "../../../domain/usecase/auth/createAuthByEmailAndPasswordUsecase";
import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../repository/authRepository";
import { Request, Response, NextFunction } from "express";

export class CreateEmailAuthController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const hashService = new HashService();
      const authRepository = new AuthRepository();
      const createAuthByEmailAndPasswordUsecase =
        new CreateAuthByEmailAndPasswordUsecase(authRepository, hashService);
      await createAuthByEmailAndPasswordUsecase.execute({ email, password });
      res
        .status(StatusCodes.CREATED)
        .send({ message: "User created successfully" });
    } catch (error) {
      next(error);
    }
  }
}
