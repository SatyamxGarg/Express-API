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
exports.addRoles = void 0;
const addRoles = (prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const roles = [
        { role_name: 'Team Lead' },
        { role_name: 'Developer' },
        { role_name: 'Senior Developer' },
        { role_name: 'Junior Developer' },
        { role_name: 'Manager' },
        { role_name: 'HR' },
        { role_name: 'Office Boy' }
    ];
    for (let role of roles) {
        const checkRole = yield prisma.emRole.findFirst({
            where: {
                roleName: role.role_name
            },
        });
        if (!checkRole) {
            yield prisma.emRole.create({
                data: {
                    roleName: role.role_name,
                },
            });
        }
    }
});
exports.addRoles = addRoles;
