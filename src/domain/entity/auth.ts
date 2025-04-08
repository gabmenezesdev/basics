import { Type } from "class-transformer";

export class Auth {
  id!: number;
  phoneNumber!: string | null;
  email!: string | null;
  password!: string | null;
  phoneConfirmed!: boolean;
  emailConfirmed!: boolean;
  phoneCode!: string | null;
  emailCode!: string | null;

  @Type(() => Date)
  phoneCodeExpiration!: Date | null;

  @Type(() => Date)
  emailCodeExpiration!: Date | null;

  @Type(() => Date)
  phoneCodeExpirationLastSent!: Date | null;

  @Type(() => Date)
  emailCodeExpirationLastSent!: Date | null;

  @Type(() => Date)
  createdAt!: Date;

  @Type(() => Date)
  updatedAt!: Date;

  constructor(partial?: Partial<Auth>) {
    Object.assign(this, partial);
  }

  validatePassword(userPassword: string) {
    if (!userPassword) {
      throw new Error("Password is required");
    }

    const hasMinLength = userPassword.length >= 8;
    const hasUpperCase = /[A-Z]/.test(userPassword);
    const hasLowerCase = /[a-z]/.test(userPassword);
    const hasNumber = /[0-9]/.test(userPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`]/.test(
      userPassword
    );

    if (!hasMinLength) {
      throw new Error("Senha tem que ter pelo menos 8 caracteres");
    }

    if (!hasUpperCase) {
      throw new Error("Senha tem que ter pelo menos uma letra maiúscula");
    }

    if (!hasLowerCase) {
      throw new Error("Senha tem que ter pelo menos uma letra minúscula");
    }

    if (!hasNumber) {
      throw new Error("Senha tem qeu ter pelo menos um número");
    }

    if (!hasSpecialChar) {
      throw new Error("Password must include at least one special character");
    }
  }

  validate() {
    if (this.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        throw new Error("Invalid email");
      }
    }

    if (this.phoneNumber) {
      const phoneRegex = /^\+?[1-9]\d{6,14}$/;
      if (!phoneRegex.test(this.phoneNumber)) {
        throw new Error("Invalid phone number");
      }
    }

    if (this.password) {
      this.validatePassword(this.password);
    }
  }
}
