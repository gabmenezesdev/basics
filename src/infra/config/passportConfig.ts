import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken";
import { AuthUserByEmailUseCase } from "../../domain/usecase/auth/authUserByEmailUseCase";
import { AuthRepository } from "../repository/authRepository";
import { HashService } from "../../service/hashService";
import { CreateAuthByPhoneOnlyUsecase } from "../../domain/usecase/auth/authUserByPhoneNumberUseCase";

export class PassportConfig {
  static configurePassport(passport: any) {
    const hashService = new HashService();
    const authRepository = new AuthRepository();

    passport.use(
      "login-email",
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            const authUserByEmailUseCase = new AuthUserByEmailUseCase(
              authRepository,
              hashService
            );
            await authUserByEmailUseCase.execute(email, password, done);
          } catch (error) {
            done(error);
          }
        }
      )
    );

    passport.use(
      "login-phone",
      new LocalStrategy(
        { usernameField: "phoneNumber" },
        async (phoneNumber, password, done) => {
          try {
            const authUserByPhoneUseCase = new CreateAuthByPhoneOnlyUsecase(
              authRepository,
              hashService
            );
            await authUserByPhoneUseCase.execute(phoneNumber, password, done);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }

  static generateToken(data: any) {
    return jwt.sign(data, process.env.JWT_SECRET || "your_jwt_secret", {
      expiresIn: "1h",
    });
  }
}
