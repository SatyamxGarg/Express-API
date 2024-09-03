"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.updateUser = exports.showUserDetails = exports.listUsers = void 0;
let tasks = [];
const BadRequest = (message) => {
    return { statusCode: 400, message };
};
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            message: 'Users fetched successfully.',
            statusCode: 200
        };
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
exports.listUsers = listUsers;
const showUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (!(task === null || task === void 0 ? void 0 : task.userId)) {
            throw BadRequest('Not found');
        }
        res.locals.response = {
            data: { details: task },
            message: 'User details fetched successfully.',
            statusCode: 200
        };
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
exports.showUserDetails = showUserDetails;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
        if (!(task === null || task === void 0 ? void 0 : task.userId)) {
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
            message: 'User details are updated.',
            statusCode: 200
        };
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
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
});
exports.updateUser = updateUser;
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = {
            userId: tasks.length + 1,
            name: req.body.name,
            description: req.body.description,
            completed: false,
        };
        tasks.push(task);
        res.locals.response = {
            data: { result: task },
            message: 'User is added successfully.',
            statusCode: 200
        };
        // return commonResponse(req, res, 201, "success", task, 1);
        // res.status(201).send({
        //   "status": 201,
        //   "message": "Done",
        //   "data": {
        //     "details": task,
        //     "totalCount": tasks.length
        //   }
        // });
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
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
});
exports.addUser = addUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            data: {},
            message: 'Deleted successfully.',
            statusCode: 200
        };
        console.log(res.locals.response);
    }
    catch (err) {
        res.locals.response = {
            data: {},
            message: (err === null || err === void 0 ? void 0 : err.message) || (err === null || err === void 0 ? void 0 : err.toString()) || 'Unknown error',
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520
        };
    }
});
exports.deleteUser = deleteUser;
exports.default = { tasks };
