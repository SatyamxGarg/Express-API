import { isEmailRegistered, isCredentialsTrue , isValidEmail} from '../services/login.service';
import { Request, Response, NextFunction } from 'express';
import { generateToken } from '../services/jwt.service';

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
              const token = await generateToken(valid);            
              res.locals.response = {
                statusCode: 200,
                message: 'Login Successfully',
                data: {valid, token},
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
       
    }  catch (err: any) {
      res.locals.response = {
        statusCode: err?.statusCode || 520,
        message: err?.message || 'Unknown error',
        data: {},
      };
      return next(); 
    }
};