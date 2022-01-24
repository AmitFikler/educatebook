import { NextFunction, Request, Response } from 'express';
import { tokenExtractor } from '../helpers/jwtService';

const userFinder = async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  if (authorization == null) throw { status: 401, message: 'Token missing' };
  try {
    req.decodedToken = tokenExtractor(authorization);
  } catch (error) {
    next(error);
  }
  next();
};

export { userFinder };
