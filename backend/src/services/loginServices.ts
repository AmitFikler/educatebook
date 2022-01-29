import { Response } from 'express';
import { User } from '../models/User';
import bcryptService from '../utils/helpers/bcryptService';
import { tokenSign } from '../utils/helpers/jwtService';

const handleLoginService = async (
  username: string,
  password: string,
  res: Response
) => {
  const user = await User.findOne({ username }); // find user by username
  if (user) {
    // if user exists
    const currentPassword = await bcryptService.comperePassword(
      password.toString(),
      user.password
    );
    if (currentPassword) {
      // if password is correct
      const userForToken = {
        username,
        id: user._id,
      };
      const token = tokenSign(userForToken); // create token
      res.status(202).json({ token, username }); // send token and username
    } else {
      throw { status: 403, message: 'wrong password' };
    }
  } else {
    throw { status: 403, message: 'wrong username' }; // if user doesn't exist
  }
};

export { handleLoginService };
