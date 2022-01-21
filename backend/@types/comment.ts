import { Types } from 'mongoose';

export interface Comment {
  usernameId: Types.ObjectId;
  contact: string;
  commentOn: Types.ObjectId;
}
