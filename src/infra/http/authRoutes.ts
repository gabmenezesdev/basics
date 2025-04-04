import { Router } from "express";
import { CreateAuthController } from "../controller/auth/createAuthController";
import passport from "passport";

const AuthRouter = Router();
const createAuthController = new CreateAuthController();

AuthRouter.post("/register", createAuthController.handle);
AuthRouter.post("/login", async (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    (
      err: Error | null,
      token: string | false,
      info: { message?: string } | undefined
    ) => {
      if (err || !token) {
        return res.status(401).json({
          message: info?.message || "Authentication failed",
        });
      }
      return res.json({ token });
    }
  )(req, res, next);
});

export { AuthRouter };
