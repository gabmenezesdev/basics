import {
  dontExistError,
  expiredCodeException,
  invalidCodeException,
} from "../../../infra/http/exceptions";
import { AuthRepository } from "../../../infra/repository/authRepository";
import { JwtService } from "../../../service/jwtService";

export class ConfirmPhoneCodeUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(phone: string, code: string): Promise<string> {
    const auth = await this.authRepository.findByPhoneNumber(phone);
    if (!auth) {
      throw dontExistError("Usuário");
    }

    if (auth.phoneCode !== code) {
      throw invalidCodeException();
    }

    if (auth.phoneCodeExpiration) {
      const phoneCodeExpirationLastSentPlus30Minutes = new Date(
        auth.phoneCodeExpiration
      );

      if (phoneCodeExpirationLastSentPlus30Minutes < new Date()) {
        throw expiredCodeException();
      }
    }

    await this.authRepository.confirmPhone(phone);

    const tokenData = {
      authId: auth.id,
      phoneNumber: auth.phoneNumber,
    };
    const generatedToken = JwtService.generateToken(tokenData);
    return generatedToken;
  }
}
