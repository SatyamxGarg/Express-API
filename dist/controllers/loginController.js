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
exports.login = void 0;
const login_service_1 = require("../services/login.service");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword } = req.body;
    const valid = yield (0, login_service_1.isValidEmail)(userEmail);
    if (!(valid)) {
        return res.status(400).send({
            data: {},
            message: 'Invalid Email.',
            statusCode: 400
        });
    }
    try {
        if (yield (0, login_service_1.isEmailRegistered)(userEmail)) {
            const valid = yield (0, login_service_1.isCredentialsTrue)(userEmail, userPassword);
            if (valid) {
                return res.status(200).send({
                    data: {},
                    message: 'Login Successfully.',
                    statusCode: 200
                });
            }
        }
        return res.status(403).send({
            data: {},
            message: 'Wrong Credentials.',
            statusCode: 403
        });
    }
    catch (err) {
        return res.status((err === null || err === void 0 ? void 0 : err.statusCode) || 520).send({
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        });
    }
});
exports.login = login;
