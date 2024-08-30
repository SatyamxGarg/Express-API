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
const middleware_1 = require("../middleware");
let tasks = [];
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, middleware_1.commonResponse)(req, res, 200, "success", tasks, tasks.length);
        // res.status(201).json({
        //     details: tasks,
        //     totalCount: tasks.length
        // })
    }
    catch (e) {
        // console.log(e);
        // res.status(402).json({
        //   message: "Error in fetching data from backend",
        // });
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false }, 0);
    }
});
exports.listUsers = listUsers;
const showUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
        if (!task) {
            // res.status(404).send('Task not found');
            return (0, middleware_1.commonResponse)(req, res, 404, "Not Found", { success: false }, 0);
        }
        else {
            // // res.json(task);
            // res.status(201).json({  
            //   details: task,
            // })
            return (0, middleware_1.commonResponse)(req, res, 200, "success", task, 1);
        }
        // const userId = Number(req.params.userId);
        // const userData = await getUserDetails(userId);
        // res.status(200).json({
        //   data: userData,
        // });
    }
    catch (_a) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false }, 0);
    }
});
exports.showUserDetails = showUserDetails;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
        if (!task) {
            // res.status(404).send('Task not found');
            return (0, middleware_1.commonResponse)(req, res, 404, "Not Found", { success: false }, 0);
        }
        else {
            task.name = req.body.name || task.name;
            task.description = req.body.description || task.description;
            task.completed = req.body.completed || task.completed;
            return (0, middleware_1.commonResponse)(req, res, 200, "success", task, 1);
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
    catch (_a) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false }, 0);
    }
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
        return (0, middleware_1.commonResponse)(req, res, 201, "success", task, 1);
        // res.status(201).send({
        //   "status": 201,
        //   "message": "Done",
        //   "data": {
        //     "details": task,
        //     "totalCount": tasks.length
        //   }
        // });
    }
    catch (_a) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false }, 0);
    }
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
            return (0, middleware_1.commonResponse)(req, res, 404, "Not Found", { success: false }, 0);
        }
        else {
            tasks.splice(index, 1);
            // res.status(204).send({
            //   "status": 204,
            //   "message": "Done",
            // });
            return (0, middleware_1.commonResponse)(req, res, 204, "success", { success: true }, 1);
        }
    }
    catch (_a) {
        return (0, middleware_1.commonResponse)(req, res, 500, "Internal Server Error", { success: false }, 0);
    }
});
exports.deleteUser = deleteUser;
exports.default = { tasks };
