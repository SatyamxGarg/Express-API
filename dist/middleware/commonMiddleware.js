"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const middleware = (req, res, next) => {
    try {
        next();
        if (!res.headersSent) {
            const { data, message, statusCode } = res.locals.response || {};
            res.status(statusCode || 200).json({
                statusCode: statusCode || 200,
                message: message || "Success",
                data: data || {},
            });
        }
    }
    catch (err) {
        res.status(err.statusCode || 500).json({
            statusCode: err.statusCode || 500,
            message: err.message || "Internal Server Eror",
        });
    }
};
exports.default = middleware;
