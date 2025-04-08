import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../../repository/authRepository";
import { SendPhoneCodeUseCase } from "../../../domain/usecase/auth/sendPhoneCodeUseCase";
import { WhatsAppService } from "../../../service/whatsappService";
import { StatusCodes } from "http-status-codes";

export class SendPhoneCodeController {
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
      const whatsAppService = new WhatsAppService();

      const sendPhoneCodeUsecase = new SendPhoneCodeUseCase(
        authRepository,
        whatsAppService
      );
      await sendPhoneCodeUsecase.execute(phoneNumber);
      res
        .status(StatusCodes.OK)
        .json({ message: "Código enviado com sucesso!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
