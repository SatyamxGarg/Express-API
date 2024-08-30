import { Request, Response } from "express";
import { Task } from '../interfaces/task.interface';
import { commonResponse } from '../middleware'

let tasks: Task[] = [];

const BadRequest = (message: string) => {
  return { statusCode: 400, message }
}
export const listUsers = async (req: Request, res: Response) => {
  // try {
  //   return commonResponse(req, res, 200, "success", tasks, tasks.length);
  //   // res.status(201).json({
  //   //     details: tasks,
  //   //     totalCount: tasks.length
  //   // })
  // } catch (e) {
  //   // console.log(e);
  //   // res.status(402).json({
  //   //   message: "Error in fetching data from backend",
  //   // });
  //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  // }

  try {
    res.locals.response = {
      data: { result: tasks, totalCount: tasks.length },
      message: 'message',
      statusCode: 200
    };
  } catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }
};


export const showUserDetails = async (req: Request, res: Response) => {

  //   try{
  //   const task = tasks.find((t) => t.userId === parseInt(req.params.userId));

  //   if (!task) {
  //     // res.status(404).send('Task not found');
  //     return commonResponse(req, res, 404, "Not Found", { success: false }, 0);
  //   } else {
  //     // // res.json(task);
  //     // res.status(201).json({  
  //     //   details: task,
  //     // })
  //         return commonResponse(req, res, 200, "success", task, 1);

  //   }
  //   // const userId = Number(req.params.userId);
  //   // const userData = await getUserDetails(userId);
  //   // res.status(200).json({
  //   //   data: userData,
  //   // });
  // }
  // catch{
  //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  // }

  try {
    const task = tasks.find((t) => t.userId == parseInt(req.params.userId));
    if (!task?.userId) {
      throw BadRequest('Not found');
    }
    res.locals.response = {
      data: { details: task },
      message: 'message',
      statusCode: 200
    };
  } catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }

};


export const updateUser = async (req: Request, res: Response) => {
  try {
    const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
    if (!task?.userId) {
      throw BadRequest('Not found');
    }
    //   task.title = req.body.title || task.title;
    //   task.description = req.body.description || task.description;
    //   task.isCompleted = req.body.isCompleted || task.isCompleted;
    //   res.locals.data = { details: task, success: true };
    //   res.locals.status = 200;
    //   res.locals.message = "updated successfully";

    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;

    res.locals.response = {
      data: { details: task },
      message: 'message',
      statusCode: 200
    };

  }
  catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }

  // // try {
  // //   const body = req.body;
  // //   const userId = Number(req.params.userId);

  // //   const updatedUser = await updateUserDetails(userId, body);
  // //   res.status(200).json({
  // //     message: "User updated successfully",
  // //     data: updatedUser,
  // //   });
  // // } catch (error) {
  // //   console.error("Error updating user details:", error);
  // //   throw new Error("Failed to update user details");
  // // }

  // catch{
  //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  // }

  //   const task = tasks.find((reqTask) => reqTask.id == parseInt(req.params.id));
  //   if (!task) {
  //     res.locals.data = { success: false };
  //     res.locals.status = 404;
  //     res.locals.message = "not found";
  //     return;
  //   }
  //   task.title = req.body.title || task.title;
  //   task.description = req.body.description || task.description;
  //   task.isCompleted = req.body.isCompleted || task.isCompleted;
  //   res.locals.data = { details: task, success: true };
  //   res.locals.status = 200;
  //   res.locals.message = "updated successfully";

};

export const addUser = async (req: Request, res: Response) => {
  try {

    const task: Task = {
      userId: tasks.length + 1,
      name: req.body.name,
      description: req.body.description,
      completed: false,
    };
    tasks.push(task);
    res.locals.response = {
      data: { result: task },
      message: 'message',
      statusCode: 200
    };
    return commonResponse(req, res, 201, "success", task, 1);
    // res.status(201).send({
    //   "status": 201,
    //   "message": "Done",
    //   "data": {
    //     "details": task,
    //     "totalCount": tasks.length
    //   }
    // });
  }
  catch (err: any) {
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }

  //const task: Task = {
  //     id: tasks.length + 1,
  //     title: req.body.title,
  //     description: req.body.description,
  //     isCompleted: false,
  //   };
  //   tasks.push(task);
  //   res.locals.data = { details: task };
  //   res.locals.status = 201;
  //   res.locals.message = "success";
};

export const deleteUser = async (req: Request, res: Response) => {
  //const userId = Number(req.params.userId);

  // try {
  //   const deletedUser = deleteUserService(userId);
  //   res.status(200).json({
  //     message: "User deleted Successfully",
  //   });
  // } catch (e) {
  //   console.error("Error deleting user:", e);
  //   res.status(401).json({
  //     message: "Error in deleting user",
  //   });
  // }
  try {

    const index = tasks.findIndex((t) => t.userId === parseInt(req.params.userId));

    if (index === -1) {
      // res.status(404).send('Task not found');
      throw BadRequest('Not found');
    }
    tasks.splice(index, 1);

    res.locals.response = {
      data: { },
      message: 'message',
      statusCode: 200
    };
    console.log(res.locals.response)
  }
  catch (err: any) {
    console.log("in catch")
    res.locals.response = {
      data: {},
      message: err?.message || err?.toString() || 'Unknown error',
      statusCode: err?.statusCode || 520
    };
  }
};

export default { tasks };