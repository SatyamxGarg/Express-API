"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserIdFromToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUserIdFromToken = (token) => {
    if (!process.env.SECRET_KEY) {
        throw new Error('SECRET_KEY environment variable is not set.');
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
        return decoded.userId || null;
    }
    catch (err) {
        console.error('Token verification failed:', err);
        return null;
    }
};
exports.getUserIdFromToken = getUserIdFromToken;
