import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const tokenExtractor = (authorization: string | undefined) => {
  try {
    if (authorization) {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, config.secret!) as JwtPayload;
      return decodedToken;
    }
  } catch (error) {
    throw { status: 401, message: 'Token invalid' };
  }
};

const tokenSign = (userForToken: { email: string; id: string }) => {
  const token = jwt.sign(userForToken, config.secret!, {
    expiresIn: '7d',
  });
  return token;
};

export { tokenExtractor, tokenSign };
