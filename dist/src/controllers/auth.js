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
exports.signInUser = exports.signUpUser = void 0;
const dummyUsers = [
    { username: 'satyam', password: 'password1' },
    { username: 'satyam_garg', password: 'password2' },
];
const BadRequest = (message) => {
    return { statusCode: 400, message };
};
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
exports.signUpUser = signUpUser;
//login
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
exports.signInUser = signInUser;
