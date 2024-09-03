"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonResponse = void 0;
const commonResponse = (req, res, statusCode, message, result, totalCount) => {
    const response = {
        status: statusCode,
        message: message,
        data: {
            result: result,
            totalCount: totalCount,
        },
    };
    return res.send(response);
};
exports.commonResponse = commonResponse;
