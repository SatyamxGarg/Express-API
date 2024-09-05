import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY environment variable is not set.');
}
export const generateToken = async (payload: object): Promise<string> => {
    return jwt.sign(payload, process.env.SECRET_KEY!, { expiresIn: '5d' });
}