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
exports.createNewUser = exports.isValidData = exports.isEmailRegistered = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const saltRounds = 10; // Number of salt rounds (recommended: 10 or higher)
        return bcrypt_1.default.hash(password, saltRounds);
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
const isValidData = (userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId) => __awaiter(void 0, void 0, void 0, function* () {
    // const isValidFirstName = (userFirstName: string) => {
    //     const nameRegex = /^[a-zA-Z\s]{2,}$/;
    //     return nameRegex.test(userFirstName);
    // };
    // const isValidLastName = (userLastName: string) => {
    //     const nameRegex = /^[a-zA-Z\s]{2,}$/;
    //     return nameRegex.test(userLastName);
    // };
    const isValidEmail = (userEmail) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };
    const isValidPhoneNumber = (userPhone) => {
        const numberRegex = /^\d{10}$/;
        return numberRegex.test(userPhone);
    };
    // const isValidGender = (userGender: string) => {
    //     return userGender === "male" || userGender === "female";
    // };
    const isValidPassword = (password) => {
        // Regular expression to match password with at least one uppercase, one lowercase, one digit, one special character, and minimum length of 8 characters
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return passwordRegex.test(password);
    };
    if (!isValidEmail(userEmail) || !isValidPhoneNumber(userPhone) || !isValidPassword(userPassword)) {
        return false;
    }
    return true;
});
exports.isValidData = isValidData;
const createNewUser = (userFirstName, userLastName, userAge, userEmail, userPhone, userCountry, userState, userCity, userPassword, userGender, userRoleId, userCreatedAt, userUpdateAt) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(userPassword);
    try {
        const userCreated = yield prisma.emUser.create({
            data: {
                userFirstName, userLastName, userAge, userEmail: userEmail.toLowerCase(),
                userPhone, userCountry, userState, userCity, userPassword: hashedPassword,
                userGender, userRoleId
            },
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
exports.createNewUser = createNewUser;
