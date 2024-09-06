// import {Request, Response, NextFunction} from "express";
// import { PrismaClient } from "@prisma/client";
// import { isEmailRegistered, isValidData, createNewUser } from '../services/signIn.service';

// // const dummyUsers = [
// //   { username: 'satyam', password: 'password1' },
// //   { username: 'satyam_garg', password: 'password2' },
// // ];

// const BadRequest = (message: string) => {
//   return { statusCode: 400, message }
// }


// export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
//   const {
//     userFirstName, userLastName, userAge, userEmail, userPhone, 
//     userCountry, userState, userCity, userPassword, userGender, 
//     userRoleId, userCreatedAt, userUpdatedAt
//   } = req.body;

//   const isDetailsValid = await isValidData(
//     userFirstName, userLastName, userAge, userEmail, userPhone, 
//     userCountry, userState, userCity, userPassword, userGender, userRoleId
//   );

//   // if (!isDetailsValid) {
//   //   // return res.status(400).send({
//   //   //   data: {},
//   //   //   message: 'Invalid Details.',
//   //   //   statusCode: 400
//   //   // });
//   // }
//   if (!isDetailsValid) {
//     res.locals.response = {
//       data: {},
//       message: 'Invalid details',
//       statusCode: 400
//     };
//     return next(); // Pass control to the middleware
//   }

//   try {
//     // if (await isEmailRegistered(userEmail)) {
//     //   return res.status(403).send({
//     //     data: {},
//     //     message: 'Email already registered',
//     //     statusCode: 403
//     //   });
//     // }
//     if (await isEmailRegistered(userEmail)) {
//       res.locals.response = {
//         data: {},
//         message: 'Email already registered',
//         statusCode: 403
//       };
//       return next(); 
//     }

//     const userCreated = await createNewUser(
//       userFirstName, userLastName, userAge, userEmail, userPhone,
//       userCountry, userState, userCity, userPassword, userGender, 
//       userRoleId, userCreatedAt, userUpdatedAt
//     );

//     // if (userCreated) {
//     //   return res.status(201).send({
//     //     data: {},
//     //     message: 'User Created Successfully.',
//     //     statusCode: 201
//     //   });
//     // } else {
//     //   return res.status(404).send({
//     //     data: {},
//     //     message: 'User not created.',
//     //     statusCode: 404
//     //   });
//     // }
//     if (userCreated) {
//       res.locals.response = {
//         data: {},
//         message: 'User Created Successfully.',
//         statusCode: 201
//       };
//     } else {
//       res.locals.response = {
//         data: {},
//         message: 'User not created.',
//         statusCode: 404
//       };
//     }

//     return next();

//   } 
//   // catch (err: any) {
//   //   return res.status(err?.statusCode || 520).send({
//   //     data: {},
//   //     message: err?.message || 'Unknown error',
//   //     statusCode: err?.statusCode || 520
//   //   });
//   // }
//   catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//     return next(); 
//   }
// };

// // export const signUpUser = async (req: Request, res: Response) => {

// //   try {
// //     const { username, password } = req.body;

// //     if (!username || !password) {
// //       throw BadRequest("Username and Password are required");
// //       // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
// //     }

// //     // Check if the username already exists
// //     const existingUser = dummyUsers.find(user => user.username === username);

// //     if (existingUser) {
// //       throw BadRequest("Username already exists");
// //       // return commonResponse(req, res, 409, "Conflict", { success: false, message: "Username already exists" }, 0);
// //     } 
    
// //     dummyUsers.push({ username, password });
// //     res.locals.response = {
// //       data: { details: username },
// //       message: 'User Successfully created',
// //       statusCode: 201
// //     };
// //       // return commonResponse(req, res, 201, "Created", { success: true, message: "User successfully registered" }, 1);
    
// //   } catch (err: any) {
// //     res.locals.response = {
// //       data: {},
// //       message: err?.message || err?.toString() || 'Unknown error',
// //       statusCode: err?.statusCode || 520
// //     };
// //   }



// // };

// //login

// // export const signInUser = async (req: Request, res: Response) => {
// //   try {
// //     const { username, password } = req.body;

// //     if (!username || !password) {
// //       throw BadRequest("Username and Password are required");
// //      // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
// //     }
    
// //     const user = dummyUsers.find(user => user.username === username && user.password === password);

// //     if (!user) {
// //       throw BadRequest("Invalid Username or Password");
// //       // return commonResponse(req, res, 200, "Success", { success: true, message: "Login successful" }, 1);
// //     } 
// //     //  return commonResponse(req, res, 401, "Unauthorized", { success: false, message: "Invalid username or password" }, 0);
// //     res.locals.response = {
// //       data: { details: username },
// //       message: 'Login Successfully',
// //       statusCode: 200
// //     };
// //   }  catch (err: any) {
// //     res.locals.response = {
// //       data: {},
// //       message: err?.message || err?.toString() || 'Unknown error',
// //       statusCode: err?.statusCode || 520
// //     };
// //   }

// // };

import { Request, Response, NextFunction } from "express";
import { isEmailRegistered, isValidData, createNewUser } from '../services/signIn.service';

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  const {
    userFirstName, userLastName, userAge, userEmail, userPhone, 
    userCountry, userState, userCity, userPassword, userGender, 
    userRoleId, userCreatedAt, userUpdatedAt
  } = req.body;

  const isDetailsValid = await isValidData(
    userFirstName, userLastName, userAge, userEmail, userPhone, 
    userCountry, userState, userCity, userPassword, userGender, userRoleId
  );

  if (!isDetailsValid) {
    res.locals.response = {
      statusCode: 401,
      message: 'Invalid details',
      data: {},
    };
    return next(); 
  }

  try {
    if (await isEmailRegistered(userEmail)) {
      res.locals.response = {
        statusCode: 403,
        message: 'Email already registered',
        data: {},
      };
      return next(); 
    }

    const userCreated = await createNewUser(
      userFirstName, userLastName, userAge, userEmail, userPhone,
      userCountry, userState, userCity, userPassword, userGender, 
      userRoleId, userCreatedAt, userUpdatedAt
    );
    if(!userCreated){
      res.locals.response = {
        statusCode: 401,
        message: 'User Not Created.',
        data: {},
      };
      return next();
    }
 
    res.locals.response = {
      statusCode: 201,
      message: 'User Created Successfully.',
      data: {},
    };
    return next();

  } catch (err: any) {
    res.locals.response = {
      statusCode: err?.statusCode || 520,
      message: err?.message || 'Unknown error',
      data: {},
    };
    return next(); 
  }
};