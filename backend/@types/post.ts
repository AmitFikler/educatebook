import { Types } from 'mongoose';

export interface Post {
  usernameId: Types.ObjectId;
  title: string;
  content: string;
  likes: number;
  picture: string;
  comments: Types.ObjectId[];
}
