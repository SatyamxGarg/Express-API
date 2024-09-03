import { PrismaClient } from "@prisma/client";
import { addRoles } from './em-roles';
import { addCountry, addState, addCity } from "./em-country-state-city";

const prisma = new PrismaClient();

async function main(){
    addRoles(prisma);
    await addCountry(prisma);
    await addState(prisma);
    await addCity(prisma);
}

main().then(async()=>{
    await prisma.$disconnect();
})
.catch(async(e)=>{
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
});