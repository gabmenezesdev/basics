import { Strategy as LocalStrategy } from "passport-local";
import { AuthUserByEmailUseCase } from "../domain/usecase/auth/authUserByEmailUseCase";
import { AuthInterface } from "../domain/entity/auth";
import { HashService } from "../service/hashService";
import { AuthRepository } from "../infra/repository/authRepository";

export class PassportConfig {
  static configurePassport(passport: any) {
    const hashService = new HashService();
    const authRepository = new AuthRepository();
    const authUserUseCase = new AuthUserByEmailUseCase(
      authRepository,
      hashService
    );

    passport.use(
      new LocalStrategy({ usernameField: "email" }, authUserUseCase.execute)
    );

    passport.serializeUser(
      (
        auth: AuthInterface,
        callback: (user: any, auth: AuthInterface) => void
      ) => {
        callback(null, auth);
      }
    );

    passport.deserializeUser(
      (id: number, callback: (error: any, user?: number) => void) => {
        callback(null, id);
      }
    );
  }
}
