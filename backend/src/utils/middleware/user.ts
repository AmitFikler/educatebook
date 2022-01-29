import { NextFunction, Request, Response } from 'express';
import { tokenExtractor } from '../helpers/jwtService';

const userFinder = async (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get('authorization');
  try {
    if (!authorization) throw { status: 401, message: 'Token missing' };
    req.decodedToken = tokenExtractor(authorization);
    next();
  } catch (error) {
    next(error);
  }
};

export { userFinder };
