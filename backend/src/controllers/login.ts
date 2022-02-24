import { NextFunction, Request, Response } from 'express';
import { handleLoginService } from '../services/loginServices';

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body; // get email and password from request body
    await handleLoginService(email, password, res);
  } catch (error) {
    next(error);
  }
};
export { handleLogin };
