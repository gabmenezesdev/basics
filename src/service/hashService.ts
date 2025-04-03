import bcrypt from "bcrypt";

export class HashService {
  private readonly saltRounds: number;

  constructor(saltRounds: number = 12) {
    this.saltRounds = saltRounds;
  }

  public async hashPassword(plainPassword: string): Promise<string> {
    if (!plainPassword) {
      throw new Error("Password cannot be empty");
    }

    const salt = await bcrypt.genSalt(this.saltRounds);
    return bcrypt.hash(plainPassword, salt);
  }

  public async comparePassword(
    plainPassword: string,
    hash: string
  ): Promise<boolean> {
    if (!plainPassword || !hash) {
      return false;
    }

    try {
      return await bcrypt.compare(plainPassword, hash);
    } catch (error) {
      console.error("Password comparison error:", error);
      return false;
    }
  }
}
