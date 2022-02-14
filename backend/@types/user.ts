import { Types } from 'mongoose';

export interface User {
  username: string;
  password: string;
  role: Role;
  posts: Types.ObjectId[];
  comments: Types.ObjectId[];
}
export type Role = 'tutor' | 'student';
