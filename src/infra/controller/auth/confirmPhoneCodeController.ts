import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../../repository/authRepository";
import { StatusCodes } from "http-status-codes";
import { ConfirmPhoneCodeUseCase } from "../../../domain/usecase/auth/confirmPhoneCodeUseCase";

export class ConfirmPhoneCodeController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber, code } = req.body;

    if (!phoneNumber || !code) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Número de telefone e código são obrigatórios!" });
      return;
    }

    try {
      const authRepository = new AuthRepository();

      const confirmPhoneCodeUsecase = new ConfirmPhoneCodeUseCase(
        authRepository
      );
      const token = await confirmPhoneCodeUsecase.execute(phoneNumber, code);
      res
        .status(StatusCodes.OK)
        .json({ message: "Código confirmado com sucesso!", token });
    } catch (error) {
      next(error);
    }
  }
}
