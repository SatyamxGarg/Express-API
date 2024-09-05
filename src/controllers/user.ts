import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY environment variable is not set.');
}

const BadRequest = (message: string) => {
  return { statusCode: 400, message }
}

// let tasks: Task[] = [];
// export const listUsers = async (req: Request, res: Response) => {
//   // try {
//   //   return commonResponse(req, res, 200, "success", tasks, tasks.length);
//   //   // res.status(201).json({
//   //   //     details: tasks,
//   //   //     totalCount: tasks.length
//   //   // })
//   // } catch (e) {
//   //   // console.log(e);
//   //   // res.status(402).json({
//   //   //   message: "Error in fetching data from backend",
//   //   // });
//   //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
//   // }

//   try {
//     res.locals.response = {
//       data: { result: tasks, totalCount: tasks.length },
//       message: 'Users fetched successfully.',
//       statusCode: 200
//     };
//   } catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }
// };


// // export const showUserDetails = async (req: Request, res: Response) => {

// //   //   try{
// //   //   const task = tasks.find((t) => t.userId === parseInt(req.params.userId));

// //   //   if (!task) {
// //   //     // res.status(404).send('Task not found');
// //   //     return commonResponse(req, res, 404, "Not Found", { success: false }, 0);
// //   //   } else {
// //   //     // // res.json(task);
// //   //     // res.status(201).json({  
// //   //     //   details: task,
// //   //     // })
// //   //         return commonResponse(req, res, 200, "success", task, 1);

// //   //   }
// //   //   // const userId = Number(req.params.userId);
// //   //   // const userData = await getUserDetails(userId);
// //   //   // res.status(200).json({
// //   //   //   data: userData,
// //   //   // });
// //   // }
// //   // catch{
// //   //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
// //   // }

// //   try {
// //     const task = tasks.find((t) => t.userId == parseInt(req.params.userId));
// //     if (!task?.userId) {
// //       throw BadRequest('Not found');
// //     }
// //     res.locals.response = {
// //       data: { details: task },
// //       message: 'User details fetched successfully.',
// //       statusCode: 200
// //     };
// //   } catch (err: any) {
// //     res.locals.response = {
// //       data: {},
// //       message: err?.message || err?.toString() || 'Unknown error',
// //       statusCode: err?.statusCode || 520
// //     };
// //   }

// // };


// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const task = tasks.find((t) => t.userId === parseInt(req.params.userId));
//     if (!task?.userId) {
//       throw BadRequest('Not found');
//     }
//     //   task.title = req.body.title || task.title;
//     //   task.description = req.body.description || task.description;
//     //   task.isCompleted = req.body.isCompleted || task.isCompleted;
//     //   res.locals.data = { details: task, success: true };
//     //   res.locals.status = 200;
//     //   res.locals.message = "updated successfully";

//     task.name = req.body.name || task.name;
//     task.description = req.body.description || task.description;
//     task.completed = req.body.completed || task.completed;

//     res.locals.response = {
//       data: { details: task },
//       message: 'User details are updated.',
//       statusCode: 200
//     };

//   }
//   catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }

//   // // try {
//   // //   const body = req.body;
//   // //   const userId = Number(req.params.userId);

//   // //   const updatedUser = await updateUserDetails(userId, body);
//   // //   res.status(200).json({
//   // //     message: "User updated successfully",
//   // //     data: updatedUser,
//   // //   });
//   // // } catch (error) {
//   // //   console.error("Error updating user details:", error);
//   // //   throw new Error("Failed to update user details");
//   // // }

//   // catch{
//   //   return commonResponse(req, res, 500, "Internal Server Error", { success: false }, 0);
//   // }

//   //   const task = tasks.find((reqTask) => reqTask.id == parseInt(req.params.id));
//   //   if (!task) {
//   //     res.locals.data = { success: false };
//   //     res.locals.status = 404;
//   //     res.locals.message = "not found";
//   //     return;
//   //   }
//   //   task.title = req.body.title || task.title;
//   //   task.description = req.body.description || task.description;
//   //   task.isCompleted = req.body.isCompleted || task.isCompleted;
//   //   res.locals.data = { details: task, success: true };
//   //   res.locals.status = 200;
//   //   res.locals.message = "updated successfully";

// };

// export const addUser = async (req: Request, res: Response) => {
//   try {

//     const task: Task = {
//       userId: tasks.length + 1,
//       name: req.body.name,
//       description: req.body.description,
//       completed: false,
//     };
//     tasks.push(task);
//     res.locals.response = {
//       data: { result: task },
//       message: 'User is added successfully.',
//       statusCode: 200
//     };
//     // return commonResponse(req, res, 201, "success", task, 1);
//     // res.status(201).send({
//     //   "status": 201,
//     //   "message": "Done",
//     //   "data": {
//     //     "details": task,
//     //     "totalCount": tasks.length
//     //   }
//     // });
//   }
//   catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }

//   //const task: Task = {
//   //     id: tasks.length + 1,
//   //     title: req.body.title,
//   //     description: req.body.description,
//   //     isCompleted: false,
//   //   };
//   //   tasks.push(task);
//   //   res.locals.data = { details: task };
//   //   res.locals.status = 201;
//   //   res.locals.message = "success";
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   //const userId = Number(req.params.userId);

//   // try {
//   //   const deletedUser = deleteUserService(userId);
//   //   res.status(200).json({
//   //     message: "User deleted Successfully",
//   //   });
//   // } catch (e) {
//   //   console.error("Error deleting user:", e);
//   //   res.status(401).json({
//   //     message: "Error in deleting user",
//   //   });
//   // }
//   try {

//     const index = tasks.findIndex((t) => t.userId === parseInt(req.params.userId));

//     if (index === -1) {
//       // res.status(404).send('Task not found');
//       throw BadRequest('Not found');
//     }
//     tasks.splice(index, 1);

//     res.locals.response = {
//       data: { },
//       message: 'Deleted successfully.',
//       statusCode: 200
//     };
//     console.log(res.locals.response)
//   }
//   catch (err: any) {
//     res.locals.response = {
//       data: {},
//       message: err?.message || err?.toString() || 'Unknown error',
//       statusCode: err?.statusCode || 520
//     };
//   }
// };

// export default { tasks };


export const getUserIdFromToken = (token: string): number | null => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: number };
    return decoded.userId || null;
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
};


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

    const userId = getUserIdFromToken(token);
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
  const userId = getUserIdFromToken(token);
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
    const userId = getUserIdFromToken(token);
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

     const userId = getUserIdFromToken(token);
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

     const userId = getUserIdFromToken(token);
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

     const userId = getUserIdFromToken(token);
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