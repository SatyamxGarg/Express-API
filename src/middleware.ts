import { Task } from "./interfaces/task.interface";
import { Response, Request } from "express";
export const commonResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  result: object,
  totalCount: number
) => {
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