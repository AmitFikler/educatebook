import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import bcryptService from '../utils/helpers/bcryptService';

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({}); // get all users
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const addNewUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password, role } = req.body; // get username, password and role from body
    const hashPassword = await bcryptService.hashPassword(password.toString()); // hash password
    const newUser = await User.create({
      // create new user
      username,
      password: hashPassword,
      role,
    });
    res.status(201).send('user created!');
  } catch (error) {
    next({ status: 400, message: 'invalid username or role' });
  }
};

const userFromToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { decodedToken } = req;
    const user = await User.findById(decodedToken!.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export { getAllUsers, addNewUser, userFromToken };
