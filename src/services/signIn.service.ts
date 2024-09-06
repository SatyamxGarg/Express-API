import { PrismaClient, Gender} from "@prisma/client";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

export const isEmailRegistered = async (userEmail: string): Promise<boolean> => {
    const findUser = await prisma.emUser.findFirst({
        where: {
            userEmail: userEmail.toLowerCase()
        }
    });
    if (findUser) return true;
    return false;
}

export const isValidData = async (userFirstName: string, userLastName:string, userAge: number, userEmail: string, userPhone: string, userCountry: string, userState: string, userCity: string, userPassword: string, userGender: Gender, userRoleId: number): Promise<boolean> => {
    // const isValidFirstName = (userFirstName: string) => {
    //     const nameRegex = /^[a-zA-Z\s]{2,}$/;
    //     return nameRegex.test(userFirstName);
    // };

    // const isValidLastName = (userLastName: string) => {
    //     const nameRegex = /^[a-zA-Z\s]{2,}$/;
    //     return nameRegex.test(userLastName);
    // };

    const isValidEmail = (userEmail: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(userEmail);
    };

    // const isValidPhoneNumber = (userPhone: string) => {
    //     const numberRegex = /^\d{10}$/;
    //     return numberRegex.test(userPhone);
    // };

    // const isValidGender = (userGender: string) => {
    //     return userGender === "male" || userGender === "female";
    // };

    const isValidPassword = (password: string) => {
        // Regular expression to match password with at least one uppercase, one lowercase, one digit, one special character, and minimum length of 8 characters
        const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return passwordRegex.test(password);
    };

    if (!isValidEmail(userEmail) || !isValidPassword(userPassword)) {
        return false;
    }

    return true;
};

export const createNewUser = async (
    userFirstName: string, userLastName: string, userAge: number,
    userEmail: string, userPhone: string, userCountry: string,
    userState: string, userCity: string, userPassword: string,
    userGender: Gender, userRoleId: number, userCreatedAt: Date, userUpdateAt: Date
  ): Promise<boolean> => {
    const hashedPassword = await hashPassword(userPassword);
    try {
      const userCreated = await prisma.emUser.create({
        data: {
          userFirstName, userLastName, userAge, userEmail: userEmail.toLowerCase(),
          userPhone, userCountry, userState, userCity, userPassword:hashedPassword, 
          userGender, userRoleId
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };
  