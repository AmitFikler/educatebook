import { Types } from 'mongoose';

export interface Post {
  usernameId: Types.ObjectId;
  title: string;
  contact: string;
  likes: {
    type: number;
    default: 0;
  };
  comments: Types.ObjectId[];
}
