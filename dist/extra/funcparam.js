"use strict";
// import { Response, Request } from "express";
// interface CommonResponseOptions {
//   statusCode: number;
//   message: string;
//   result: object;
//   totalCount: number;
// }
// export const commonResponse = (
//   req: Request,
//   res: Response,
//   options: CommonResponseOptions
// ) => {
//   const { statusCode, message, result, totalCount } = options;
//   const response = {
//     status: statusCode,
//     message: message,
//     data: {
//       result: result,
//       totalCount: totalCount,
//     },
//   };
//   return res.send(response);
// };
// import { Request, Response } from "express";
// import { Task } from '../interfaces/task.interface';
// import { commonResponse } from '../middleware';
// let tasks: Task[] = [];
// export const listUsers = async (req: Request, res: Response) => {
//   try {
//     return commonResponse(req, res, {
//       statusCode: 200,
//       message: "success",
//       result: tasks,
//       totalCount: tasks.length
//     });
//   } catch (e) {
//     return commonResponse(req, res, {
//       statusCode: 500,
//       message: "Internal Server Error",
//       result: { success: false },
//       totalCount: 0
//     });
//   }
// };
// export const showUserDetails = async (req: Request, res: Response) => {
//   try {
//     const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
//     if (!task) {
//       return commonResponse(req, res, {
//         statusCode: 404,
//         message: "Not Found",
//         result: { success: false },
//         totalCount: 0
//       });
//     } else {
//       return commonResponse(req, res, {
//         statusCode: 200,
//         message: "success",
//         result: task,
//         totalCount: 1
//       });
//     }
//   } catch {
//     return commonResponse(req, res, {
//       statusCode: 500,
//       message: "Internal Server Error",
//       result: { success: false },
//       totalCount: 0
//     });
//   }
// };
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
//     if (!task) {
//       return commonResponse(req, res, {
//         statusCode: 404,
//         message: "Not Found",
//         result: { success: false },
//         totalCount: 0
//       });
//     } else {
//       task.name = req.body.name || task.name;
//       task.description = req.body.description || task.description;
//       task.completed = req.body.completed || task.completed;
//       return commonResponse(req, res, {
//         statusCode: 200,
//         message: "success",
//         result: task,
//         totalCount: 1
//       });
//     }
//   } catch {
//     return commonResponse(req, res, {
//       statusCode: 500,
//       message: "Internal Server Error",
//       result: { success: false },
//       totalCount: 0
//     });
//   }
// };
// export const addUser = async (req: Request, res: Response) => {
//   try {
//     const task: Task = {
//       userId: tasks.length + 1,
//       name: req.body.name,
//       description: req.body.description,
//       completed: false,
//     };
//     tasks.push(task);
//     return commonResponse(req, res, {
//       statusCode: 200,
//       message: "success",
//       result: task,
//       totalCount: 1
//     });
//   } catch {
//     return commonResponse(req, res, {
//       statusCode: 500,
//       message: "Internal Server Error",
//       result: { success: false },
//       totalCount: 0
//     });
//   }
// };
// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const index = tasks.findIndex((t) => t.userId === parseInt(req.params.userId));
//     if (index === -1) {
//       return commonResponse(req, res, {
//         statusCode: 404,
//         message: "Not Found",
//         result: { success: false },
//         totalCount: 0
//       });
//     } else {
//       tasks.splice(index, 1);
//       return commonResponse(req, res, {
//         statusCode: 200,
//         message: "success",
//         result: { success: true },
//         totalCount: 1
//       });
//     }
//   } catch {
//     return commonResponse(req, res, {
//       statusCode: 500,
//       message: "Internal Server Error",
//       result: { success: false },
//       totalCount: 0
//     });
//   }
// };
// export default { tasks };
