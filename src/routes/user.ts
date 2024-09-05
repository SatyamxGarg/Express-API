import { Router, Request, Response } from "express";
import {
  getCountries,
  getStates,
  getCities,
    // addUser,
    // deleteUser,
    // listUsers,
    showUserDetails,
    updateUser,
    changePassword,
  } from "../controllers/user";
  // import authMiddleware from "../middleware/auth";
  // import id from '../interfaces/task.interface';

const userRouter = Router();

// userRouter.get("/", listUsers);
// userRouter.delete("/:userId", deleteUser);
userRouter.get("", showUserDetails);
userRouter.put("/update-user", updateUser);
userRouter.get("/get-country", getCountries);
userRouter.post("/get-state", getStates);
userRouter.post("/get-city", getCities);
userRouter.put("/change-password",changePassword)



// userRouter.post("/", addUser);


export default userRouter;