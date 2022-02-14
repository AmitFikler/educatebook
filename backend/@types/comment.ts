import { Types } from 'mongoose';

export interface Comment {
  usernameId: Types.ObjectId;
  content: string;
  commentOn: Types.ObjectId;
}
