import { Router, Request, Response } from "express";
import {
    addUser,
    deleteUser,
    listUsers,
    showUserDetails,
    updateUser,
  } from "../controllers/user";
  // import id from '../interfaces/task.interface';

const userRouter = Router();

userRouter.get("/", listUsers);
userRouter.delete("/:userId", deleteUser);
userRouter.get("/:userId", showUserDetails);
userRouter.put("/:userId", updateUser);
userRouter.post("/", addUser);


export default userRouter;