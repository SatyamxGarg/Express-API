import { isEmailRegistered, isCredentialsTrue , isValidEmail} from '../services/login.service';
import { Request, Response } from 'express';


export const login = async (req: Request, res: Response) => {
    const { userEmail, userPassword } = req.body;

    
    const valid = await isValidEmail(userEmail);

    if(!(valid)){
        return res.status(400).send({
            data: {},
            message: 'Invalid Email.',
            statusCode: 400
          });
    }
    

    try {

        if (await isEmailRegistered(userEmail)) {
            

            const valid =  await isCredentialsTrue(userEmail, userPassword);
            if (valid) {
                return res.status(200).send({
                    data: {},
                    message: 'Login Successfully.',
                    statusCode: 200
                  });
            }

        }
        return res.status(403).send({
            data: {},
            message: 'Wrong Credentials.',
            statusCode: 403
          });

    } catch (err: any) {
        return res.status(err?.statusCode || 520).send({
          data: {},
          message: err?.message || 'Unknown error',
          statusCode: err?.statusCode || 520
        });
      }
};