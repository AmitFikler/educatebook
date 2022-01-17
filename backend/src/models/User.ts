import mongoose from 'mongoose';
import { User } from '../../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
