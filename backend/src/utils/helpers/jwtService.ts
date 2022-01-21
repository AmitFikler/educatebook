import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

const tokenExtractor = (authorization: string | undefined) => {
  if (!(authorization && authorization.toLowerCase().startsWith('bearer ')))
    throw { status: 401, message: 'Token missing' };
  let decodedToken = null;
  try {
    decodedToken = jwt.verify(
      authorization.substring(7),
      config.secret!
    ) as JwtPayload;
    return decodedToken;
  } catch (error) {
    throw { status: 401, message: 'Invalid token' };
  }
};

const tokenSign = (userForToken: { username: string; id: string }) => {
  const token = jwt.sign(userForToken, config.secret!, {
    expiresIn: '7d',
  });
  return token;
};

export { tokenExtractor, tokenSign };
