import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../../infra/repository/authRepository";
import { PassportConfig } from "../../../infra/config/passportConfig";

export class AuthUserByEmailUseCase {
  constructor(
    private authRepository: AuthRepository,
    private hashService: HashService
  ) {}

  async execute(email: string, inputPassword: string, callback: Function) {
    const foundAuth = await this.authRepository.findByEmail(email);

    if (!foundAuth) {
      return callback(null, false, { message: "Usuário Não encontrado" });
    }

    try {
      const isPasswordMatch = this.hashService.comparePassword(
        inputPassword,
        foundAuth.password
      );

      if (!isPasswordMatch) {
        return callback(null, false, { message: "Senha incorreta" });
      }

      const { password, ...user } = foundAuth;

      const token = PassportConfig.generateToken(user);
      return callback(null, token);
    } catch (error) {
      return callback(error);
    }
  }
}
