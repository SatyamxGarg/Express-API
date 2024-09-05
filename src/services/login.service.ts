import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainTextPassword, hashedPassword);
}

export const isEmailRegistered = async(userEmail:string): Promise<boolean>=>{
    const findUser = await prisma.emUser.findFirst({
        where: {
            userEmail: userEmail.toLowerCase()
        }
    });
    
    if(findUser) return true;

    return false;
}


export const isValidEmail = async (userEmail: string): Promise<boolean> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(userEmail);
};

export const isCredentialsTrue = async(userEmail:string,userPassword:string)=>{
    const findUser = await prisma.emUser.findFirst({
        where: {
            userEmail: userEmail.toLowerCase(),
        }
    });
    const isMatch = await comparePasswords(userPassword, findUser!.userPassword);

    if(isMatch){
        return {
            userEmail:userEmail,
            userId: findUser!.userId
        }
    }
    return false;

}