import mongoose from 'mongoose';
import { Comment } from '../../@types/comment';

const CommentsSchema = new mongoose.Schema<Comment>(
  {
    usernameId: { type: 'ObjectId', ref: 'User' },
    content: { type: String, required: true },
    commentOn: { type: 'ObjectId', ref: 'Post' },
  },
  { timestamps: true }
);

const Comment = mongoose.model<Comment>('Comment', CommentsSchema);
export { Comment };
