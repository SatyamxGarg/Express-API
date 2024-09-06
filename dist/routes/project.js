"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const projectRouter = (0, express_1.Router)();
projectRouter.get("/", projectController_1.listProjects);
projectRouter.post("/", projectController_1.addProjects);
projectRouter.delete("/:id", projectController_1.deleteProject);
projectRouter.get("/:id", projectController_1.getProjects);
projectRouter.put("/:id", projectController_1.updateProject);
exports.default = projectRouter;
