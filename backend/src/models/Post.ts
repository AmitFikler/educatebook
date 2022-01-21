import mongoose from 'mongoose';
import { Post } from '../../@types/post';

const PostSchema = new mongoose.Schema<Post>(
  {
    usernameId: { type: 'ObjectId', ref: 'User' },
    title: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    comments: [{ type: 'ObjectId', ref: 'Comment' }],
  },
  { timestamps: true }
);

const Post = mongoose.model<Post>('Post', PostSchema);
export { Post };
