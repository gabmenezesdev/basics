import { StatusCodes } from "http-status-codes";
import { CreateAuthByPhoneOnlyUsecase } from "../../../domain/usecase/auth/createAuthByPhoneOnlyUsecase";
import { AuthRepository } from "../../repository/authRepository";
import { Request, Response, NextFunction } from "express";

export class CreatePhoneAuthController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Número de telefone é obrigatório!" });
      return;
    }

    try {
      const authRepository = new AuthRepository();
      const createAuthByEmailAndPasswordUsecase =
        new CreateAuthByPhoneOnlyUsecase(authRepository);
      await createAuthByEmailAndPasswordUsecase.execute({ phoneNumber });
      res
        .status(StatusCodes.CREATED)
        .json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
      next(error);
    }
  }
}
