import { Types } from 'mongoose';

export interface Post {
  usernameId: Types.ObjectId;
  title: string;
  content: string;
  likes: number;
  comments: Types.ObjectId[];
}
