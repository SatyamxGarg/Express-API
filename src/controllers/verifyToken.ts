import { Request, Response,NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token == null) {
            res.locals.response = {
                statusCode: 401,
                message: 'Unauthorized user.',
                data: {},
              };
              return next(); 
        }

        jwt.verify(token, process.env.SECRET_KEY!, (err: any, user: any) => {
            if (err) {
                res.locals.response = {
                    statusCode: 401,
                    message: 'Unauthorized user.',
                    data: {},
                  };
                  return next(); 
            }
        });
        res.locals.response = {
            statusCode: 200,
            message: 'Token Verified.',
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


export default verifyToken;