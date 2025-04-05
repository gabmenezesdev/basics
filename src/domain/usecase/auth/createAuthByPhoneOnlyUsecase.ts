import { StatusCodes } from "http-status-codes";
import { AuthRepository } from "../../../infra/repository/authRepository";
import { alreadyExistsError } from "../../../infra/http/exceptions";

export class CreateAuthByPhoneOnlyUsecase {
  constructor(private authRepository: AuthRepository) {}

  async execute(
    data: CreateAuthByEmailAndPasswordUsecaseInterface
  ): Promise<void> {
    const auth = await this.authRepository.findByPhoneNumber(data.phoneNumber);
    if (auth) {
      throw alreadyExistsError("telefone");
    }

    const registerData = {
      phoneNumber: data.phoneNumber,
    };

    await this.authRepository.create(registerData);
  }
}

interface CreateAuthByEmailAndPasswordUsecaseInterface {
  phoneNumber: string;
}
