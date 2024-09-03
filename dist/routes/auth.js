"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signUpController_1 = require("../controllers/signUpController");
const loginController_1 = require("../controllers/loginController");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", signUpController_1.signUpUser);
authRouter.post("/login", loginController_1.login);
exports.default = authRouter;
