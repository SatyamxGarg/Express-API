"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const commonMiddleware_1 = __importDefault(require("./middleware/commonMiddleware"));
const app = (0, express_1.default)();
const port = 8081;
// export const middleware = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await next(); // Let the route handler or other middleware execute first
//     // Only send a response if none has been sent yet
//     if (!res.headersSent) {
//     //  const { data = {}, message = 'No message', statusCode = 200 } = res.locals.response || {};
//      const {data, message, statusCode} = res.locals.response;
//       res.status(statusCode).json({
//         statusCode,
//         message,
//         data,
//       });
//       console.log('Response data:', res.locals.response);
//     }
//   } catch (err: any) {
//     // Catch any unhandled errors and send an error response if not already sent
//     if (!res.headersSent) {
//       res.status(err?.statusCode || 520).json({
//         data: {},
//         message: err?.message || 'Unknown error',
//         statusCode: err?.statusCode || 520
//       });
//     }
//   }
// };
//app.use(cors());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/", routes_1.default);
app.use(commonMiddleware_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
