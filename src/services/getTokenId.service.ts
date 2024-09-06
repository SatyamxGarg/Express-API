import jwt from 'jsonwebtoken';

export const getUserIdFromToken = (token: string): number | null => {

if (!process.env.SECRET_KEY) {
    throw new Error('SECRET_KEY environment variable is not set.');
  }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: number };
      return decoded.userId || null;
    } catch (err) {
      console.error('Token verification failed:', err);
      return null;
    }
  };
  

  