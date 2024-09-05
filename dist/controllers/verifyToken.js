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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized user.',
                data: {},
            };
            return next();
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.locals.response = {
                    statusCode: 401,
                    message: 'Unauthorized user.',
                    data: {},
                };
                return next();
            }
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Token Verified.',
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
exports.default = verifyToken;
