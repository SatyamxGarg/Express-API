import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import { getUserIdFromToken } from "../services/getTokenId.service";

const prisma = new PrismaClient();

const BadRequest = (message: string) => {
  return { statusCode: 400, message }
}

export const showUserDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const user = await prisma.emUser.findFirst({
      where: {
        userId: userId
      }
    });

    if (!user) {
      res.locals.response = {
        statusCode: 400,
        message: 'User Not Found.',
        data: {},
      };
      return next();
    }

    res.locals.response = {
      statusCode: 200,
      message: 'User Found.',
      data: { user }
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


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
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

  const { userFirstName, userLastName, userAge, userPhone, userGender, userCountry, userState, userCity } = req.body;

  if (
    !userFirstName || !userLastName || !userAge || !userPhone ||
    !userCountry || !userState || !userCity
  ) {
    res.locals.response = {
      statusCode: 400,
      message: 'Invalid Details.',
      data: {},
    };
    return next();
  }

  try {
    const updatedUser = await prisma.emUser.update({
      where: { userId: userId },
      data: {
        userFirstName,
        userLastName,
        userAge,
        userPhone,
        userGender,
        userCountry,
        userState,
        userCity
      }
    });
    res.locals.response = {
      statusCode: 200,
      message: 'User Details Updated Successfully.',
      data: { updatedUser },
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



export const getCountries = async (req: Request, res: Response, next: NextFunction) => {
  try {
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

    const countries = await prisma.emCountry.findMany({
      select: {
        countryName: true,
        countryId: true,
      },
    });

    res.locals.response = {
      statusCode: 200,
      message: 'Countries Fetched Successfully.',
      data: {countries},
    };
    return next();
  }catch (err: any) {
    res.locals.response = {
      statusCode: err?.statusCode || 520,
      message: err?.message || 'Unknown error',
      data: {},
    };
    return next(); 
  }
};

export const getStates = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const { userCountry } = req.body;
    if (!userCountry) {
    res.locals.response = {
      statusCode: 404,
      message: 'Country is required.',
      data: {},
    };
    return next();
    }

    const country = await prisma.emCountry.findFirst({
      where: { countryName: userCountry },
      select: { countryId: true },
    });

    if (!country) {
      res.locals.response = {
        statusCode: 404,
        message: 'Country not Found.',
        data: {},
      };
      return next();
    }

    const states = await prisma.emState.findMany({
      where: { countryId: country.countryId },
      select: { stateId: true, stateName: true },
    });
    res.locals.response = {
      statusCode: 200,
      message: 'States fetched successfully.',
      data: { states },
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

export const getCities = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const { userState } = req.body;
    if (!userState) {
    res.locals.response = {
      statusCode: 404,
      message: 'State is required.',
      data: {},
    };
    return next();
    }

    const state = await prisma.emState.findFirst({
      where: { stateName: userState },
      select: { stateId: true },
    });

    if (!state) {
      res.locals.response = {
        statusCode: 404,
        message: 'State not Found.',
        data: {},
      };
      return next();
    }

    const cities = await prisma.emCities.findMany({
      where: { stateId: state.stateId },
      select: { cityId: true, cityName: true },
    });
    res.locals.response = {
      statusCode: 200,
      message: 'Cities fetched successfully.',
      data: { cities },
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


export const changePassword = async (req: Request, res: Response, next: NextFunction) => {

  try {
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
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.locals.response = {
        statusCode: 400,
        message: 'Password fields can`t be empty.',
        data: {},
      };
      return next();
    }

    const user = await prisma.emUser.findFirst({ where: { userId: userId } });
    if (!user) {
      res.locals.response = {
        statusCode: 400,
        message: 'User Not Found.',
        data: {},
      };
      return next();
    }

    const isMatch = await bcrypt.compare(currentPassword, user.userPassword);
    if (!isMatch) {
      res.locals.response = {
        statusCode: 400,
        message: 'Current password doesn`t match.',
        data: {},
      };
      return next();
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>])[A-Za-z\d!@#$%^&*()\-_=+{};:,<.>.]{8,}$/;
    if (!passwordPattern.test(newPassword)) {
      res.locals.response = {
        statusCode: 400,
        message: 'New password is invalid.',
        data: {},
      };
      return next();
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.emUser.update({
      where: { userId: userId },
      data: { userPassword: hashedPassword }
    });
    res.locals.response = {
      statusCode: 201,
      message: 'Password Successfully Updated.',
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