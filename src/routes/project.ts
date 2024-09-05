import { Router, Request, Response } from "express";
 import { addProjects, deleteProject, getProjects, listProjects, updateProject } from "../controllers/projectController";

const projectRouter = Router();

projectRouter.get("/list-projects", listProjects)
projectRouter.post("/add-project", addProjects);
projectRouter.delete("/del-project/:id", deleteProject);
projectRouter.get("/get-project/:id", getProjects);
projectRouter.put("/update-project/:id", updateProject)

export default projectRouter;