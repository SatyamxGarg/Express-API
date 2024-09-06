import { Router, Request, Response } from "express";
 import { addProjects, deleteProject, getProjects, listProjects, updateProject } from "../controllers/projectController";

const projectRouter = Router();

projectRouter.get("/", listProjects);
projectRouter.post("/", addProjects);
projectRouter.delete("/:id", deleteProject);
projectRouter.get("/:id", getProjects);
projectRouter.put("/:id", updateProject);

export default projectRouter;