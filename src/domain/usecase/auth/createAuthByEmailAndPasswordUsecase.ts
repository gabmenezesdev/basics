import { HashService } from "../../../service/hashService";
import { AuthRepository } from "../../../infra/repository/authRepository";

export class CreateAuthByEmailAndPasswordUsecase {
  constructor(
    private authRepository: AuthRepository,
    private hashService: HashService
  ) {}

  async execute(
    data: CreateAuthByEmailAndPasswordUsecaseInterface
  ): Promise<void> {
    const auth = await this.authRepository.findByEmail(data.email);
    if (auth) {
      throw new Error("Email já utilizado");
    }

    const password = await this.hashService.hashPassword(data.password);

    const registerData = {
      email: data.email,
      password,
    };

    await this.authRepository.create(registerData);
  }
}

interface CreateAuthByEmailAndPasswordUsecaseInterface {
  email: string;
  password: string;
}
