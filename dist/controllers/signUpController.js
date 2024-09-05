"use strict";
// import {Request, Response, NextFunction} from "express";
// import { PrismaClient } from "@prisma/client";
// import { isEmailRegistered, isValidData, createNewUser } from '../services/signIn.service';
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
const signUpUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId, userCreatedAt, userUpdatedAt } = req.body;
    const isDetailsValid = yield (0, signIn_service_1.isValidData)(userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId);
    if (!isDetailsValid) {
        res.locals.response = {
            statusCode: 401,
            message: 'Invalid details',
            data: {},
        };
        return next();
    }
    try {
        if (yield (0, signIn_service_1.isEmailRegistered)(userEmail)) {
            res.locals.response = {
                statusCode: 403,
                message: 'Email already registered',
                data: {},
            };
            return next();
        }
        const userCreated = yield (0, signIn_service_1.createNewUser)(userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId, userCreatedAt, userUpdatedAt);
        if (!userCreated) {
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.signUpUser = signUpUser;
