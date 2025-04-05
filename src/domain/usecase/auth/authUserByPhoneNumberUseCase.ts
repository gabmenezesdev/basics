import { AuthRepository } from "../../../infra/repository/authRepository";
import { JwtService } from "../../../service/jwtService";

export class LoginWithPhoneOnlyUsecase {
  constructor(private authRepository: AuthRepository) {}

  async execute(phoneNumber: string, callback: Function) {
    const foundAuth = await this.authRepository.findByPhoneNumber(phoneNumber);

    if (!foundAuth) {
      return callback(null, false, { message: "Usuário Não encontrado" });
    }

    try {
      const { password, ...user } = foundAuth;

      const token = JwtService.generateToken(user);
      return callback(null, token);
    } catch (error) {
      return callback(error);
    }
  }
}
