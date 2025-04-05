import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../../repository/authRepository";
import { SendPhoneCodeUseCase } from "../../../domain/usecase/auth/sendPhoneCodeUseCase";
import { WhatsAppService } from "../../../service/whatsappService";
import { StatusCodes } from "http-status-codes";

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
      res.status(StatusCodes.OK).json({ message: "Code sent successfully" });
    } catch (error) {
      next(error);
    }
  }
}
