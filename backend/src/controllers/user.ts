import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcryptService from '../utils/helpers/bcryptService';

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(error);
  }
};
const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, role } = req.body;
    const hashPassword = await bcryptService.hashPassword(password.toString()); // hash password
    await User.create({
      username,
      password: hashPassword,
      role,
    });
    res.send('user created!');
  } catch (error) {
    next({ status: 400, message: 'invalid username or role' });
  }
};

export { getAllUsers, addNewUser };
