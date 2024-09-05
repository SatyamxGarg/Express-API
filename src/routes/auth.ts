import { Router, Request, Response } from "express";
import { signUpUser } from "../controllers/signUpController";
import { login } from "../controllers/loginController";
import verifyToken from "../controllers/verifyToken";

const authRouter = Router();

authRouter.post("/signup", signUpUser);
authRouter.post("/login", login);
authRouter.post("/verifyToken", verifyToken);


export default authRouter;