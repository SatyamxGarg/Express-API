import {Request, Response} from "express";
import { commonResponse } from '../middleware'

const dummyUsers = [
  { username: 'satyam', password: 'password1' },
  { username: 'satyam_garg', password: 'password2' },
];

export const signUpUser = async (req: Request, res: Response) => {

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
    }

    // Check if the username already exists
    const existingUser = dummyUsers.find(user => user.username === username);

    if (existingUser) {
      return commonResponse(req, res, 409, "Conflict", { success: false, message: "Username already exists" }, 0);
    } else {
      dummyUsers.push({ username, password });

      return commonResponse(req, res, 201, "Created", { success: true, message: "User successfully registered" }, 1);
    }
  } catch (e) {
    return commonResponse(req, res, 500, "Internal Server Error", { success: false, message: "An error occurred while processing the request" }, 0);
  }


};

//login
export const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
    }
    
    const user = dummyUsers.find(user => user.username === username && user.password === password);

    if (user) {
      return commonResponse(req, res, 200, "Success", { success: true, message: "Login successful" }, 1);
    } else {
      return commonResponse(req, res, 401, "Unauthorized", { success: false, message: "Invalid username or password" }, 0);
    }
  } catch (e) {
    return commonResponse(req, res, 500, "Internal Server Error", { success: false, message: "An error occurred while processing the request" }, 0);
  }
};
