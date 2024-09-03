// here is my index.ts file where middleware is defined
// import express, { NextFunction, Request, Response } from "express";
// import rootRouter from './routes';

// const app = express();
// const port = 8080;

// export const middleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await next();
//     if (!res.headersSent) {
//       const {data, message, statusCode} = res.locals.response;
//       res.status(statusCode).json({
//         statusCode,
//         message,
//         data,
//       });
//     }
//   } catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     }; 
//   }
// };

// app.use(express.json());
// app.use(middleware);
// app.use("/", rootRouter);

// app.listen(port, () => {
//   console.log(Server is running on http://localhost:${port});
// });
// from index it routes to here in routes folder index .ts
// import { Router } from "express";
// import userRouter from "./user";
// import authRouter from "./auth"
// // import authMiddleware from "../middleware/auth";


// const rootRouter = Router();

// rootRouter.use('/auth', authRouter)
// rootRouter.use('/user', userRouter);

// export default rootRouter;
// from index.ts it goes to auth.ts
// import { Router, Request, Response } from "express";
// import { signUpUser } from "../controllers/signUpController";
// import { login } from "../controllers/loginController";

// const authRouter = Router();

// authRouter.post("/signup", signUpUser);
// authRouter.post("/login", login);


// export default authRouter;
// then it goes to signup controller for signup
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
//     return next(); 
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
// the problem is that i want to send the response back to the middleware i doing this but it not working whats the problem here