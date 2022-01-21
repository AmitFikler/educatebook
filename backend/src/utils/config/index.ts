import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  salt_rounds: process.env.SALT_ROUNDS,
  secret: process.env.SECRET,
};
