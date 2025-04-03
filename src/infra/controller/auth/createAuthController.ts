import { CreateAuthByEmailAndPasswordUsecase } from "../../../domain/usecase/auth/createAuthByEmailAndPasswordUsecase";
import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../repository/authRepository";
import { Request, Response, NextFunction } from "express";

export class CreateAuthController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    try {
      const hashService = new HashService();
      const authRepository = new AuthRepository();
      const createAuthByEmailAndPasswordUsecase =
        new CreateAuthByEmailAndPasswordUsecase(authRepository, hashService);
      await createAuthByEmailAndPasswordUsecase.execute({ email, password });
      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}
