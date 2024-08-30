import { Request, Response } from "express";
import { Task } from '../interfaces/task.interface';
import { commonResponse } from '../middleware'
let tasks: Task[] = [];



export const listUsers = async (req: Request, res: Response) => {
  try {
    return commonResponse(req, res, 200, "success", tasks, tasks.length);
    // res.status(201).json({
    //     details: tasks,
    //     totalCount: tasks.length
    // })
  } catch (e) {
    // console.log(e);
    // res.status(402).json({
    //   message: "Error in fetching data from backend",
    // });
    return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  }
};


export const showUserDetails = async (req: Request, res: Response) => {

  try{
  const task = tasks.find((t) => t.userId === parseInt(req.params.userId));

  if (!task) {
    // res.status(404).send('Task not found');
    return commonResponse(req, res, 404, "Not Found", { success: false }, 0);
  } else {
    // // res.json(task);
    // res.status(201).json({  
    //   details: task,
    // })
        return commonResponse(req, res, 200, "success", task, 1);

  }
  // const userId = Number(req.params.userId);
  // const userData = await getUserDetails(userId);
  // res.status(200).json({
  //   data: userData,
  // });
}
catch{
  return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
}
};


export const updateUser = async (req: Request, res: Response) => {
  try{
  const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
  if (!task) {
    // res.status(404).send('Task not found');
    return commonResponse(req, res, 404, "Not Found", { success: false }, 0);
  } else {
    task.name = req.body.name || task.name;
    task.description = req.body.description || task.description;
    task.completed = req.body.completed || task.completed;
    return commonResponse(req, res, 200, "success", task, 1);
    // res.json(task);
  }
}
  // try {
  //   const body = req.body;
  //   const userId = Number(req.params.userId);

  //   const updatedUser = await updateUserDetails(userId, body);
  //   res.status(200).json({
  //     message: "User updated successfully",
  //     data: updatedUser,
  //   });
  // } catch (error) {
  //   console.error("Error updating user details:", error);
  //   throw new Error("Failed to update user details");
  // }

  catch{
    return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  }
};

export const addUser = async (req: Request, res: Response) => {
try{

  const task: Task = {
    userId: tasks.length + 1,
    name: req.body.name,
    description: req.body.description,
    completed: false,
  };

  tasks.push(task);
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
catch{
  return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
}
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
  try{

    const index = tasks.findIndex((t) => t.userId === parseInt(req.params.userId));
  
    if (index === -1) {
      // res.status(404).send('Task not found');
      return commonResponse(req, res, 404, "Not Found", { success: false }, 0);
    } else {
      tasks.splice(index, 1);
      // res.status(204).send({
      //   "status": 204,
      //   "message": "Done",
      // });
      return commonResponse(req, res, 204, "success", { success: true }, 1);
  
    }
  }
  catch{
    return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
  }

};

export default { tasks };