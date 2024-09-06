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
exports.updateProject = exports.getProjects = exports.deleteProject = exports.listProjects = exports.addProjects = void 0;
const client_1 = require("@prisma/client");
const getTokenId_service_1 = require("../services/getTokenId.service");
const prisma = new client_1.PrismaClient();
const addProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }
    const { projectName, projectDescription, projectTech, projectStatus, projectLead, projectManager, projectClient, managementTool, managementUrl, repoTool, repoUrl, projectStartDate, projectDeadlineDate } = req.body;
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
        const project = yield prisma.emProject.create({
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.addProjects = addProjects;
const listProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }
    try {
        const projects = yield prisma.emProject.findMany({
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.listProjects = listProjects;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }
    const id = req.params.id;
    try {
        const project = yield prisma.emProject.findFirst({
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
        yield prisma.emProject.delete({
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.deleteProject = deleteProject;
const getProjects = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
    if (!userId) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: Invalid token.',
            data: {},
        };
        return next();
    }
    try {
        const id = req.params.id;
        const project = yield prisma.emProject.findFirst({
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.getProjects = getProjects;
const updateProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.locals.response = {
            statusCode: 401,
            message: 'Unauthorized: No token provided.',
            data: {},
        };
        return next();
    }
    const userId = yield (0, getTokenId_service_1.getUserIdFromToken)(token);
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
    const id = req.params.id;
    const { projectName, projectDescription, projectTech, projectStatus, projectLead, projectManager, projectClient, managementTool, managementUrl, repoTool, repoUrl, projectStartDate, projectDeadlineDate } = req.body;
    if (!projectName ||
        !projectTech ||
        !projectDescription ||
        !projectStatus ||
        !projectLead ||
        !projectManager ||
        !projectClient ||
        !managementTool ||
        !managementUrl ||
        !repoTool ||
        !repoUrl) {
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
        const project = yield prisma.emProject.update({
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
    }
    catch (err) {
        res.locals.response = {
            statusCode: (err === null || err === void 0 ? void 0 : err.statusCode) || 520,
            message: (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error',
            data: {},
        };
        return next();
    }
});
exports.updateProject = updateProject;
