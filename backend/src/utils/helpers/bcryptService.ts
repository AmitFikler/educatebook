import bcrypt from 'bcrypt';
import config from '../config';

const SALT: number = Number(config.salt_rounds);

const hashPassword = async (password: string) => {
  try {
    const hashSalt = await bcrypt.genSalt(SALT);
    const hashedPassword = await bcrypt.hash(password, hashSalt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

const comperePassword = async (
  passwordFromUser: string,
  passwordFromDB: string
) => {
  return bcrypt.compare(passwordFromUser, passwordFromDB); // true or false
};

export default {
  hashPassword,
  comperePassword,
};
