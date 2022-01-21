import { JwtPayload } from 'jsonwebtoken';
import { Blog, User } from '../../models';

declare global {
  namespace Express {
    interface Request {
      decodedToken: JwtPayload;
    }
  }
}
