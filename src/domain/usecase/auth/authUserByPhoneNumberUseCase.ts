import { Repository } from "typeorm";
import { AuthDBEntity } from "../../../infra/database/entities/auth.entity";
import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../../infra/repository/authRepository";
import { PassportConfig } from "../../../infra/config/passportConfig";

export class LoginWithPhoneOnlyUsecase {
  constructor(private authRepository: AuthRepository) {}

  async execute(phoneNumber: string, callback: Function) {
    const foundAuth = await this.authRepository.findByPhoneNumber(phoneNumber);

    if (!foundAuth) {
      return callback(null, false, { message: "Usuário Não encontrado" });
    }

    try {
      const { password, ...user } = foundAuth;

      const token = PassportConfig.generateToken(user);
      return callback(null, token);
    } catch (error) {
      return callback(error);
    }
  }
}
