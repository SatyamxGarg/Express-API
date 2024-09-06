import { Router, Request, Response } from "express";
import {
  getCountries,
  getStates,
  getCities,
    showUserDetails,
    updateUser,
    changePassword,
  } from "../controllers/user";

const userRouter = Router();


userRouter.get("/", showUserDetails);
userRouter.put("/", updateUser);
userRouter.get("/get-country", getCountries);
userRouter.post("/get-state", getStates);
userRouter.post("/get-city", getCities);
userRouter.put("/change-password",changePassword)



export default userRouter;