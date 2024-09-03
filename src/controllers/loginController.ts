import { isEmailRegistered, isCredentialsTrue , isValidEmail} from '../services/login.service';
import { Request, Response, NextFunction } from 'express';


export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, userPassword } = req.body;

    
    const valid = await isValidEmail(userEmail);

    if(!(valid)){
      res.locals.response = {
        statusCode: 400,
        message: 'Invalid Email',
        data: {},
      };
      return next(); 
    }
    
    try {

        if (await isEmailRegistered(userEmail)) {
            

            const valid =  await isCredentialsTrue(userEmail, userPassword);
            if (valid) {
              res.locals.response = {
                statusCode: 200,
                message: 'Login Successfully',
                data: {},
              };
              return next(); 
            }

        }
        res.locals.response = {
          statusCode: 403,
          message: 'Wrong Credentials.',
          data: {},
        };
        return next();
       
    } catch (err: any) {
        return res.status(err?.statusCode || 520).send({
          data: {},
          message: err?.message || 'Unknown error',
          statusCode: err?.statusCode || 520
        });
      }
};