import { NextFunction, Request, Response } from 'express';
import { User } from '../models/User';
import bcryptService from '../services/bcryptService';

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const currentPassword = await bcryptService.comperePassword(
        password.toString(),
        user.password
      );
      if (currentPassword) {
        res.send('login successfully!');
      } else {
        throw { status: 403, message: 'wrong password' };
      }
    } else {
      throw { status: 403, message: 'wrong username' };
    }
  } catch (error) {
    next(error);
  }
};
export { handleLogin };
