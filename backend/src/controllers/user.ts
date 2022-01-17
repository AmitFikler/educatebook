import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    next(res.sendStatus(400).send(error));
  }
};
export { getAllUsers };
