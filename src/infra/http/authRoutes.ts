import { Router } from "express";
import { CreateAuthController } from "../controller/auth/createAuthController";

const AuthRouter = Router();
const createAuthController = new CreateAuthController();

AuthRouter.post("/", createAuthController.handle);

export { AuthRouter };
