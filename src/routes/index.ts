import { Router } from "express";
import userRouter from "./user";
import authRouter from "./auth"
import projectRouter from "./project";
// import authMiddleware from "../middleware/auth";


const rootRouter = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/user', userRouter);
rootRouter.use('/project', projectRouter);

export default rootRouter;