import { Router } from "express";
import { CreateEmailAuthController } from "../../controller/auth/createEmailAuthController";
import passport from "passport";
import { Request, Response } from "express";
import { CreatePhoneAuthController } from "../../controller/auth/createPhoneAuthController";
import { SendPhoneCodeController } from "../../controller/auth/sendPhoneCodeController";
import { ConfirmPhoneCodeController } from "../../controller/auth/confirmPhoneCodeController";

const AuthRouter = Router();
const createEmailAuthController = new CreateEmailAuthController();
const createAuthController = new CreatePhoneAuthController();
const sendPhoneCodeController = new SendPhoneCodeController();
const confirmPhoneCodeController = new ConfirmPhoneCodeController();

AuthRouter.post("/send-code/phone", sendPhoneCodeController.handle);
AuthRouter.post("/confirm-code/phone", confirmPhoneCodeController.handle);
AuthRouter.post("/register/email", createEmailAuthController.handle);
AuthRouter.post("/register/phone", createAuthController.handle);
AuthRouter.post(
  "/login/email",
  passport.authenticate("login-email", { session: false }),
  (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Usuário ou senha incorretos" });
    } else {
      res
        .status(200)
        .json({ message: "Login realizado com sucesso", data: req.user });
    }
  }
);
AuthRouter.post(
  "/login/phone",
  passport.authenticate("login-phone", { session: false }),
  (req: Request, res: Response) => {
    if (!req.user) {
      res.status(401).json({ message: "Usuário ou senha incorretos" });
    } else {
      res
        .status(200)
        .json({ message: "Login realizado com sucesso", data: req.user });
    }
  }
);

export { AuthRouter };
