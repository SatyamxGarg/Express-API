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
exports.changePassword = exports.getCities = exports.getStates = exports.getCountries = exports.updateUser = exports.showUserDetails = void 0;
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const getTokenId_service_1 = require("../services/getTokenId.service");
const prisma = new client_1.PrismaClient();
const BadRequest = (message) => {
    return { statusCode: 400, message };
};
const showUserDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: No token provided.',
                data: {},
            };
            return next();
        }
        const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const user = yield prisma.emUser.findFirst({
            where: {
                userId: userId
            }
        });
        if (!user) {
            res.locals.response = {
                statusCode: 400,
                message: 'User Not Found.',
                data: {},
            };
            return next();
        }
        res.locals.response = {
            statusCode: 200,
            message: 'User Found.',
            data: { user }
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
exports.showUserDetails = showUserDetails;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }
    const { userFirstName, userLastName, userAge, userPhone, userGender, userCountry, userState, userCity } = req.body;
    if (!userFirstName || !userLastName || !userAge || !userPhone ||
        !userCountry || !userState || !userCity) {
        res.locals.response = {
            statusCode: 400,
            message: 'Invalid Details.',
            data: {},
        };
        return next();
    }
    try {
        const updatedUser = yield prisma.emUser.update({
            where: { userId: userId },
            data: {
                userFirstName,
                userLastName,
                userAge,
                userPhone,
                userGender,
                userCountry,
                userState,
                userCity
            }
        });
        res.locals.response = {
            statusCode: 200,
            message: 'User Details Updated Successfully.',
            data: { updatedUser },
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
exports.updateUser = updateUser;
const getCountries = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: No token provided.',
                data: {},
            };
            return next();
        }
        const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const countries = yield prisma.emCountry.findMany({
            select: {
                countryName: true,
                countryId: true,
            },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Countries Fetched Successfully.',
            data: { countries },
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
exports.getCountries = getCountries;
const getStates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: No token provided.',
                data: {},
            };
            return next();
        }
        const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const { userCountry } = req.body;
        if (!userCountry) {
            res.locals.response = {
                statusCode: 404,
                message: 'Country is required.',
                data: {},
            };
            return next();
        }
        const country = yield prisma.emCountry.findFirst({
            where: { countryName: userCountry },
            select: { countryId: true },
        });
        if (!country) {
            res.locals.response = {
                statusCode: 404,
                message: 'Country not Found.',
                data: {},
            };
            return next();
        }
        const states = yield prisma.emState.findMany({
            where: { countryId: country.countryId },
            select: { stateId: true, stateName: true },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'States fetched successfully.',
            data: { states },
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
exports.getStates = getStates;
const getCities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: No token provided.',
                data: {},
            };
            return next();
        }
        const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const { userState } = req.body;
        if (!userState) {
            res.locals.response = {
                statusCode: 404,
                message: 'State is required.',
                data: {},
            };
            return next();
        }
        const state = yield prisma.emState.findFirst({
            where: { stateName: userState },
            select: { stateId: true },
        });
        if (!state) {
            res.locals.response = {
                statusCode: 404,
                message: 'State not Found.',
                data: {},
            };
            return next();
        }
        const cities = yield prisma.emCities.findMany({
            where: { stateId: state.stateId },
            select: { cityId: true, cityName: true },
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Cities fetched successfully.',
            data: { cities },
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
exports.getCities = getCities;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: No token provided.',
                data: {},
            };
            return next();
        }
        const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
        if (!userId) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized: Invalid token.',
                data: {},
            };
            return next();
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            res.locals.response = {
                statusCode: 400,
                message: 'Password fields can`t be empty.',
                data: {},
            };
            return next();
        }
        const user = yield prisma.emUser.findFirst({ where: { userId: userId } });
        if (!user) {
            res.locals.response = {
                statusCode: 400,
                message: 'User Not Found.',
                data: {},
            };
            return next();
        }
        const isMatch = yield bcrypt_1.default.compare(currentPassword, user.userPassword);
        if (!isMatch) {
            res.locals.response = {
                statusCode: 400,
                message: 'Current password doesn`t match.',
                data: {},
            };
            return next();
        }
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/;
        if (!passwordPattern.test(newPassword)) {
            res.locals.response = {
                statusCode: 400,
                message: 'New password is invalid.',
                data: {},
            };
            return next();
        }
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
        yield prisma.emUser.update({
            where: { userId: userId },
            data: { userPassword: hashedPassword }
        });
        res.locals.response = {
            statusCode: 201,
            message: 'Password Successfully Updated.',
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
exports.changePassword = changePassword;
