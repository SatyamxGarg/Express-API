import { Router, Request, Response } from "express";
import { signUpUser } from "../controllers/signUpController";
import { login } from "../controllers/loginController";

const authRouter = Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", login);


export default authRouter;