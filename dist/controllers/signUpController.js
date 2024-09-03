"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpUser = void 0;
const signIn_service_1 = require("../services/signIn.service");
// const dummyUsers = [
//   { username: 'satyam', password: 'password1' },
//   { username: 'satyam_garg', password: 'password2' },
// ];
const BadRequest = (message) => {
    return { statusCode: 400, message };
};
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId, userCreatedAt, userUpdatedAt } = req.body;
    const isDetailsValid = yield (0, signIn_service_1.isValidData)(userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId);
    if (!isDetailsValid) {
        return res.status(400).send({
            data: {},
            message: 'Invalid Details.',
            statusCode: 400
        });
    }
    try {
        if (yield (0, signIn_service_1.isEmailRegistered)(userEmail)) {
            return res.status(403).send({
                data: {},
                message: 'Email already registered',
                statusCode: 403
            });
        }
        const userCreated = yield (0, signIn_service_1.createNewUser)(userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId, userCreatedAt, userUpdatedAt);
        if (userCreated) {
            return res.status(201).send({
                data: {},
                message: 'User Created Successfully.',
                statusCode: 201
            });
        }
        else {
            return res.status(404).send({
                data: {},
                message: 'User not created.',
                statusCode: 404
            });
        }
    }
    catch (err) {
        return res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 520).send({
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        });
    }
});
exports.signUpUser = signUpUser;
// export const signUpUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw BadRequest("Username and Password are required");
//       // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
//     }
//     // Check if the username already exists
//     const existingUser = dummyUsers.find(user => user.username === username);
//     if (existingUser) {
//       throw BadRequest("Username already exists");
//       // return commonResponse(req, res, 409, "Conflict", { success: false, message: "Username already exists" }, 0);
//     } 
//     dummyUsers.push({ username, password });
//     res.locals.response = {
//       data: { details: username },
//       message: 'User Successfully created',
//       statusCode: 201
//     };
//       // return commonResponse(req, res, 201, "Created", { success: true, message: "User successfully registered" }, 1);
//   } catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }
// };
//login
// export const signInUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       throw BadRequest("Username and Password are required");
//      // return commonResponse(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
//     }
//     const user = dummyUsers.find(user => user.username === username && user.password === password);
//     if (!user) {
//       throw BadRequest("Invalid Username or Password");
//       // return commonResponse(req, res, 200, "Success", { success: true, message: "Login successful" }, 1);
//     } 
//     //  return commonResponse(req, res, 401, "Unauthorized", { success: false, message: "Invalid username or password" }, 0);
//     res.locals.response = {
//       data: { details: username },
//       message: 'Login Successfully',
//       statusCode: 200
//     };
//   }  catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }
// };
