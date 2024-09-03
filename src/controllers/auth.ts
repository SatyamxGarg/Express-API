import {Request, Response} from "express";
import { commonResponse } from '../middleware'

const dummyUsers = [
  { username: 'satyam', password: 'password1' },
  { username: 'satyam_garg', password: 'password2' },
];

const BadRequest = (message: string) => {
  return { statusCode: 400, message }
}

export const signUpUser = async (req: Request, res: Response) => {

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw BadRequest("Username and Password are required");
      // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
    }

    // Check if the username already exists
    const existingUser = dummyUsers.find(user => user.username === username);

    if (existingUser) {
      throw BadRequest("Username already exists");
      // return commonResponse(req, res, 409, "Conflict", { success: false, message: "Username already exists" }, 0);
    } 
    
    dummyUsers.push({ username, password });
    res.locals.response = {
      data: { details: username },
      message: 'User Successfully created',
      statusCode: 201
    };
      // return commonResponse(req, res, 201, "Created", { success: true, message: "User successfully registered" }, 1);
    
  } catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }



};

//login
export const signInUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw BadRequest("Username and Password are required");
     // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
    }
    
    const user = dummyUsers.find(user => user.username === username && user.password === password);

    if (!user) {
      throw BadRequest("Invalid Username or Password");
      // return commonResponse(req, res, 200, "Success", { success: true, message: "Login successful" }, 1);
    } 
    //  return commonResponse(req, res, 401, "Unauthorized", { success: false, message: "Invalid username or password" }, 0);
    res.locals.response = {
      data: { details: username },
      message: 'Login Successfully',
      statusCode: 200
    };
  }  catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }

};