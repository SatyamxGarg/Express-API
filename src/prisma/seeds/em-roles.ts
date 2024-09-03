import { PrismaClient } from "@prisma/client";

export const addRoles = async(prisma: PrismaClient) => {

    const roles = [
    { role_name: 'Team Lead' },
    { role_name: 'Developer' },
    { role_name: 'Senior Developer' },
    { role_name: 'Junior Developer' },
    { role_name: 'Manager' },
    { role_name: 'HR' },
    { role_name: 'Office Boy' }
];
const checkRole = await prisma.emRole.count();
  if(checkRole === 0){
    const res =  await prisma.emRole.createMany({
     data: roles.map((role: any) => ({
      roleName: role.role_name
     }))
    });
  }
// for(let role of roles){
//     const checkRole = await prisma.emRole.findFirst({
//         where: {
//           roleName: role.role_name
//         },
//       });
//     if(!checkRole){
//         await prisma.emRole.create({
//             data: {
//                 roleName: role.role_name,
//               },
//         })
//     }
// }

}