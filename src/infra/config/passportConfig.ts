import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";
import { AuthUserByEmailUseCase } from "../../domain/usecase/auth/authUserByEmailUseCase";
import { AuthRepository } from "../repository/authRepository";
import { HashService } from "../../service/hashService";

export class PassportConfig {
  static configurePassport(passport: any) {
    const hashService = new HashService();
    const authRepository = new AuthRepository();
    const authUserUseCase = new AuthUserByEmailUseCase(
      authRepository,
      hashService
    );

    passport.use(
      new LocalStrategy(
        { usernameField: "email" },
        async (email, password, done) => {
          try {
            await authUserUseCase.execute(email, password, done);
          } catch (error) {
            done(error);
          }
        }
      )
    );
  }

  static generateToken(user: any) {
    return jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );
  }
}
