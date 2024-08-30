import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth"
// import authMiddleware from "../middleware/auth";


const rootRouter = Router();

rootRouter.use('/auth', authRouter)
rootRouter.use('/user', userRouter);

export default rootRouter;