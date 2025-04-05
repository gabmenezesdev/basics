import {
  dontExistError,
  operationDontAllowedError,
} from "../../../infra/http/exceptions";
import { AuthRepository } from "../../../infra/repository/authRepository";
import { generateRandomCode } from "./auth.utils";
import { WhatsAppService } from "../../../service/whatsappService";

export class SendPhoneCodeUseCase {
  constructor(
    private authRepository: AuthRepository,
    private whatsappService: WhatsAppService
  ) {}

  async execute(phone: string): Promise<void> {
    const auth = await this.authRepository.findByPhoneNumber(phone);
    if (!auth) {
      return dontExistError("Usuário");
    }

    if (auth.phoneCodeExpirationLastSent) {
      const phoneCodeExpirationLastSentPlus5Minutes = new Date(
        auth.phoneCodeExpirationLastSent
      );
      phoneCodeExpirationLastSentPlus5Minutes.setMinutes(
        phoneCodeExpirationLastSentPlus5Minutes.getMinutes() + 5
      );

      if (phoneCodeExpirationLastSentPlus5Minutes < new Date()) {
        return operationDontAllowedError(
          "Código já enviado, aguarde 5 minutos para solicitar um novo."
        );
      }
    }

    const code = generateRandomCode().toString();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 5);

    await this.authRepository.updateCode(
      phone,
      code,
      expirationTime,
      new Date()
    );

    await this.whatsappService.sendWhatsappTextMessage(
      phone,
      `${process.env.BRAND_NAME} - Seu código de verificação é: ${code}. O código expira em 5 minutos.`
    );
  }
}
