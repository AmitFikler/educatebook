import { Response } from 'express';
import { User } from '../models/User';
import bcryptService from '../utils/helpers/bcryptService';
import { tokenSign } from '../utils/helpers/jwtService';

const handleLoginService = async (
  email: string,
  password: string,
  res: Response
) => {
  try {
    const user = await User.findOne({ email }); // find user by username
    if (user) {
      // if user exists
      const currentPassword = await bcryptService.comperePassword(
        password.toString(),
        user.password
      );
      if (currentPassword) {
        // if password is correct
        const userForToken = {
          email,
          id: user._id,
        };
        const token = tokenSign(userForToken); // create token
        res.status(202).json({ token, user }); // send token and username
      } else {
        throw { status: 403, message: 'wrong password' };
      }
    } else {
      throw { status: 403, message: 'wrong username' }; // if user doesn't exist
    }
  } catch (error) {
    throw error;
  }
};

export { handleLoginService };
