import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from "@prisma/client";
import { getUserIdFromToken } from "../services/getTokenId.service";


const prisma = new PrismaClient();

import jwt from 'jsonwebtoken';


export const addProjects = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }

    const {
        projectName,
        projectDescription,
        projectTech,
        projectStatus,
        projectLead,
        projectManager,
        projectClient,
        managementTool,
        managementUrl,
        repoTool,
        repoUrl,
        projectStartDate,
        projectDeadlineDate
    } = req.body;

    if (!projectName || !projectDescription) {
        res.locals.response = {
            statusCode: 400,
            message: 'Bad Request: Fields can`t be empty.',
            data: {},
        };
        return next();
    }

    try {
        const startDate = new Date(projectStartDate).toISOString();
        const deadlineDate = new Date(projectDeadlineDate).toISOString();
        const project = await prisma.emProject.create({
            data: {
                projectUserId: userId,
                projectName,
                projectDescription,
                projectTech,
                projectStatus,
                projectLead,
                projectManager,
                projectClient,
                managementTool,
                managementUrl,
                repoTool,
                repoUrl,
                projectStartDate: startDate,
                projectDeadlineDate: deadlineDate
            }
        });

        res.locals.response = {
            statusCode: 200,
            message: 'Project Successfully Added.',
            data: { project },
        };
        return next();
    } catch (err: any) {
        res.locals.response = {
            statusCode: err?.statusCode || 520,
            message: err?.message || 'Unknown error',
            data: {},
        };
        return next();
    }
};


export const listProjects = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }

    try {
        const projects = await prisma.emProject.findMany({
            where: {
                projectUserId: userId
            }
        });

        if (projects.length < 1) {
            res.locals.response = {
                statusCode: 404,
                message: 'No List found.',
                data: {},
            };
            return next();
        }
        res.locals.response = {
            statusCode: 200,
            message: 'List found.',
            data: { projects },
        };
        return next();
    } catch (err: any) {
        res.locals.response = {
            statusCode: err?.statusCode || 520,
            message: err?.message || 'Unknown error',
            data: {},
        };
        return next();
    }
};



export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }


    const id = req.params.id as string;
    try {
        const project = await prisma.emProject.findFirst({
            where: {
                projectId: parseInt(id),
                projectUserId: userId
            }
        });

        if (!project) {
            res.locals.response = {
                statusCode: 404,
                message: 'Project doesn`t exist.',
                data: {},
            };
            return next();
        }
        await prisma.emProject.delete({
            where: {
                projectId: parseInt(id)
            }
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Project successfully deleted.',
            data: {},
        };
        return next();
    } catch (err: any) {
        res.locals.response = {
            statusCode: err?.statusCode || 520,
            message: err?.message || 'Unknown error',
            data: {},
        };
        return next();
    }
};


export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }

    try {
        const id = req.params.id as string;

        const project = await prisma.emProject.findFirst({
            where: {
                projectId: parseInt(id),
                projectUserId: userId,
            },
        });

        if (!project) {
            res.locals.response = {
                statusCode: 404,
                message: 'Project not found.',
                data: {},
            };
            return next();
        }

        res.locals.response = {
            statusCode: 200,
            message: 'Project successfully fetched.',
            data: [project],
        };
        return next();
    } catch (err: any) {
        res.locals.response = {
            statusCode: err?.statusCode || 520,
            message: err?.message || 'Unknown error',
            data: {},
        };
        return next();
    }
};



export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }

    const userId = await getUserIdFromToken(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }

    if (req.method !== 'PUT') {
        res.locals.response = {
            statusCode: 405,
            message: 'Method Not Allowed',
            data: {},
        };
        return next();
    }

    const id = req.params.id as string;

    const {
        projectName,
        projectDescription,
        projectTech,
        projectStatus,
        projectLead,
        projectManager,
        projectClient,
        managementTool,
        managementUrl,
        repoTool,
        repoUrl,
        projectStartDate,
        projectDeadlineDate
    } = req.body;

    if (
        !projectName ||
        !projectTech ||
        !projectDescription ||
        !projectStatus ||
        !projectLead ||
        !projectManager ||
        !projectClient ||
        !managementTool ||
        !managementUrl ||
        !repoTool ||
        !repoUrl
    ) {
        res.locals.response = {
            statusCode: 400,
            message: 'Invalid details: Missing required fields.',
            data: {},
        };
        return next();
    }

    try {
        const startDate = new Date(projectStartDate).toISOString();
        const deadlineDate = new Date(projectDeadlineDate).toISOString();
        const project = await prisma.emProject.update({
            where: {
                projectId: parseInt(id),
            },
            data: {
                projectName: projectName,
                projectDescription: projectDescription,
                projectTech: projectTech,
                projectStatus: projectStatus,
                projectLead: projectLead,
                projectManager: projectManager,
                projectClient: projectClient,
                managementTool: managementTool,
                managementUrl: managementUrl,
                repoTool: repoTool,
                repoUrl: repoUrl,
                projectStartDate: startDate,
                projectDeadlineDate: deadlineDate
            },
        });

        res.locals.response = {
            statusCode: 200,
            message: 'Project details updated successfully.',
            data: [project],
        };
        return next();
    } catch (err: any) {
        res.locals.response = {
            statusCode: err?.statusCode || 520,
            message: err?.message || 'Unknown error',
            data: {},
        };
        return next();
    }
};
