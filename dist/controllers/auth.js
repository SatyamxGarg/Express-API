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
const middleware_1 = require("../middleware");
const dummyUsers = [
    { username: 'satyam', password: 'password1' },
    { username: 'satyam_garg', password: 'password2' },
];
const signUpUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return (0, middleware_1.commonResponse)(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
        }
        // Check if the username already exists
        const existingUser = dummyUsers.find(user => user.username === username);
        if (existingUser) {
            return (0, middleware_1.commonResponse)(req, res, 409, "Conflict", { success: false, message: "Username already exists" }, 0);
        }
        else {
            dummyUsers.push({ username, password });
            return (0, middleware_1.commonResponse)(req, res, 201, "Created", { success: true, message: "User successfully registered" }, 1);
        }
    }
    catch (e) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false, message: "An error occurred while processing the request" }, 0);
    }
});
exports.signUpUser = signUpUser;
//login
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return (0, middleware_1.commonResponse)(req, res, 400, "Bad Request", { success: false, message: "Username and password are required" }, 0);
        }
        const user = dummyUsers.find(user => user.username === username && user.password === password);
        if (user) {
            return (0, middleware_1.commonResponse)(req, res, 200, "Success", { success: true, message: "Login successful" }, 1);
        }
        else {
            return (0, middleware_1.commonResponse)(req, res, 401, "Unauthorized", { success: false, message: "Invalid username or password" }, 0);
        }
    }
    catch (e) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false, message: "An error occurred while processing the request" }, 0);
    }
});
exports.signInUser = signInUser;
