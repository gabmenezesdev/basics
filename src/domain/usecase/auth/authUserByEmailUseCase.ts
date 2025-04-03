import { Repository } from "typeorm";
import { AuthDBEntity } from "../../../infra/database/entities/auth.entity";
import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../../infra/repository/authRepository";

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
      return callback(null, user);
    } catch (error) {
      return callback(error);
    }
  }
}
