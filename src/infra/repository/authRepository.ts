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

  async create(data: { email: string; password: string }): Promise<void> {
    await this.repository.save(data);
  }
}
