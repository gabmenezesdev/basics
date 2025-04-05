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
      throw dontExistError("Usuário");
    }

    if (auth.phoneCodeExpirationLastSent) {
      const phoneCodeExpirationLastSentPlus5Minutes = new Date(
        auth.phoneCodeExpirationLastSent
      );
      phoneCodeExpirationLastSentPlus5Minutes.setMinutes(
        phoneCodeExpirationLastSentPlus5Minutes.getMinutes() + 5
      );

      if (phoneCodeExpirationLastSentPlus5Minutes > new Date()) {
        throw operationDontAllowedError(
          "Código já enviado, aguarde 5 minutos para solicitar um novo."
        );
      }
    }

    const code = generateRandomCode().toString();
    const expirationTime = new Date();
    expirationTime.setMinutes(expirationTime.getMinutes() + 30);

    await this.authRepository.updateCode(
      phone,
      code,
      expirationTime,
      new Date()
    );

    await this.whatsappService.sendWhatsappTextMessage(
      phone,
      `${process.env.BRAND_NAME} - Segue abaixou seu código de verificação! Ele expira em 30 minutos.👇`
    );
    await this.whatsappService.sendWhatsappTextMessage(phone, code);
  }
}
