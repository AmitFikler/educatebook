import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { User } from '../../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (e: string) => isEmail(e),
      },
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['tutor', 'student'],
    },
    posts: [{ type: 'ObjectId', ref: 'Post' }],
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
