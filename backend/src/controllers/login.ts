import { NextFunction, Request, Response } from 'express';
import { handleLoginService } from '../services/loginServices';

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body; // get username and password from request body
    await handleLoginService(username, password, res);
  } catch (error) {
    next(error);
  }
};
export { handleLogin };
