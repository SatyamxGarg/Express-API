import { Request, Response } from "express";
import { Task } from '../interfaces/task.interface';

let tasks: Task[] = [];


export const listUsers = async (req: Request, res: Response) => {

  try {
    res.status(201).json({
        details: tasks,
        totalCount: tasks.length
    })
  } catch (e) {
    console.log(e);
    res.status(402).json({
      message: "Error in fetching data from backend",
    });
  }
};

export const showUserDetails = async (req: Request, res: Response) => {

    const task = tasks.find((t) => t.userId === parseInt(req.params.userId));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        // res.json(task);
        res.status(201).json({
            details:task,
        })
    }
    // const userId = Number(req.params.userId);
    // const userData = await getUserDetails(userId);
    // res.status(200).json({
    //   data: userData,
    // });
  };


  export const updateUser = async (req: Request, res: Response) => {
    const task = tasks.find((t) => t.userId === parseInt(req.params.userId));

    if (!task) {
        res.status(404).send('Task not found');
    } else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task);
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
  };

  export const addUser = async (req: Request, res: Response) => {
    const task: Task = {
      userId: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };

    tasks.push(task);
    res.status(201).send({
        "status":201,
        "message":"Done",
        "data":{
            "details":task,
            "totalCount":tasks.length
        }
    });
  };

  export const deleteUser = async (req: Request, res: Response) => {
    const userId = Number(req.params.userId);
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

    const index = tasks.findIndex((t) =>t.userId === parseInt(req.params.userId));

    if (index === -1) {
        res.status(404).send('Task not found');
    } else {
        tasks.splice(index, 1);
        res.status(204).send({
            "status":204,
          "message":"Done",
        });
    }
  };
  