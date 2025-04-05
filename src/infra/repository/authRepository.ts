import { Repository } from "typeorm";
import { AuthDBEntity } from "../database/entities/auth.entity";
import { AppDataSource } from "../..";

export class AuthRepository {
  private repository: Repository<AuthDBEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(AuthDBEntity);
  }

  async findByEmail(email: string): Promise<AuthDBEntity | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findByPhoneNumber(phoneNumber: string): Promise<AuthDBEntity | null> {
    return this.repository.findOne({ where: { phoneNumber } });
  }

  async create(data: {
    emai?: string;
    phoneNumber?: string;
    password?: string;
  }): Promise<void> {
    await this.repository.save(data);
  }
}
