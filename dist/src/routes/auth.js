"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const authRouter = (0, express_1.Router)();
authRouter.post("/signup", auth_1.signUpUser);
authRouter.post("/signin", auth_1.signInUser);
exports.default = authRouter;
