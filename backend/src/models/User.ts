import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import { User } from '../../@types/user';

const UserSchema = new mongoose.Schema<User>(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
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
      minlength: 8,
    },
    role: {
      type: String,
      required: true,
      enum: ['tutor', 'student'],
    },
    posts: [{ type: 'ObjectId', ref: 'Post' }],
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
    likes: [{ type: 'ObjectId', ref: 'Post' }],
  },
  { timestamps: true }
);

const User = mongoose.model<User>('User', UserSchema);
export { User };
