import { Types } from 'mongoose';

export interface User {
  fullName: string;
  email: string;
  password: string;
  role: Role;
  posts: Types.ObjectId[];
  comments: Types.ObjectId[];
  likes: Types.ObjectId[];
}
export type Role = 'tutor' | 'student';
