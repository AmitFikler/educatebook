import dotenv from 'dotenv';
dotenv.config();

export default {
  port: process.env.PORT,
  mongodb_url: process.env.MONGODB_URL,
  mongodb_url_test: process.env.MONGODB_URL_TEST,
  salt_rounds: process.env.SALT_ROUNDS,
  secret: process.env.SECRET,
};
