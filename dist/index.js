"use strict";
// import express, { Application, Request, Response } from 'express';
// // import taskRoutes from "./tasks";
// import rootRouter from './routes';
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
// const app: Application = express();
// const port: number = 3000;
// app.use(express.json());
// app.get("/",(req:Request,res:Response)=>{
//     res.send("working..........");
// })
// // app.use('/tasks',taskRoutes);
// app.use("/", rootRouter);
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = 8080;
const middleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        if (!res.headersSent) {
            const { data, message, statusCode } = res.locals.response;
            res.status(statusCode).json({
                statusCode,
                message,
                data,
            });
        }
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
app.use(express_1.default.json());
app.use(middleware);
app.use("/", routes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
