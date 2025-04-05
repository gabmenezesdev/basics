import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../../repository/authRepository";
import { SendPhoneCodeUseCase } from "../../../domain/usecase/auth/sendPhoneCodeUseCase";
import { WhatsAppService } from "../../../service/whatsappService";

export class SendPhoneCodeController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { phoneNumber } = req.body;

    try {
      const authRepository = new AuthRepository();
      const whatsAppService = new WhatsAppService();

      const sendPhoneCodeUsecase = new SendPhoneCodeUseCase(
        authRepository,
        whatsAppService
      );
      await sendPhoneCodeUsecase.execute(phoneNumber);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}
