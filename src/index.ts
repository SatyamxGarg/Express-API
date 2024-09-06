import express, { NextFunction, Request, Response } from "express";
import rootRouter from './routes';
import cors from 'cors';
import middleware from "./middleware/commonMiddleware";

const app = express();
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

app.use(cors());
app.use(express.json());
app.use("/api/v1/", rootRouter);
app.use(middleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
