import { Strategy as LocalStrategy } from "passport-local";
import { AuthUserByEmailUseCase } from "../../domain/usecase/auth/authUserByEmailUseCase";
import { AuthRepository } from "../repository/authRepository";
import { HashService } from "../../service/hashService";
import { LoginWithPhoneOnlyUsecase } from "../../domain/usecase/auth/authUserByPhoneNumberUseCase";

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
            const authUserByPhoneUseCase = new LoginWithPhoneOnlyUsecase(
              authRepository
            );
            await authUserByPhoneUseCase.execute(phoneNumber, done);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }
}
