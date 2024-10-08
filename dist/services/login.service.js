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
exports.isCredentialsTrue = exports.isValidEmail = exports.isEmailRegistered = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function comparePasswords(plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
}
const isEmailRegistered = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield prisma.emUser.findFirst({
        where: {
            userEmail: userEmail.toLowerCase()
        }
    });
    if (findUser)
        return true;
    return false;
});
exports.isEmailRegistered = isEmailRegistered;
const isValidEmail = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
});
exports.isValidEmail = isValidEmail;
const isCredentialsTrue = (userEmail, userPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const findUser = yield prisma.emUser.findFirst({
        where: {
            userEmail: userEmail.toLowerCase(),
        }
    });
    const isMatch = yield comparePasswords(userPassword, findUser.userPassword);
    if (isMatch) {
        return {
            userEmail: userEmail,
            userId: findUser.userId
        };
    }
    return false;
});
exports.isCredentialsTrue = isCredentialsTrue;
