"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpController_1 = require("../controllers/signUpController");
const loginController_1 = require("../controllers/loginController");
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", signUpController_1.signUpUser);
authRouter.post("/login", loginController_1.login);
authRouter.post("/verifyToken", verifyToken_1.default);
exports.default = authRouter;
