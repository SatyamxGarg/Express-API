import express, { NextFunction, Request, Response } from "express";
import rootRouter from './routes';

const app = express();
const port = 8080;

const middleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await next();
    if (!res.headersSent) {
      const {data, message, statusCode} = res.locals.response;
      res.status(statusCode).json({
        statusCode,
        message,
        data,
      });
    }
  } catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    }; 
  }
};

app.use(express.json());
app.use(middleware);
app.use("/", rootRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
