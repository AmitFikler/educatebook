import { Request, Response, NextFunction } from 'express';
import { Comment } from '../models/Comments';
import { Post } from '../models/Post';
import { User } from '../models/User';

const addAComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { content, commentOn } = req.body;
    if (commentOn && content) {
      const newComment = await Comment.create({
        usernameId: decodedToken!.id,
        content,
        commentOn,
      });
      const user = await User.findById(decodedToken!.id);
      const post = await Post.findById(commentOn);
      if (user && post) {
        user.comments = user.comments.concat(newComment._id);
        post.comments = post.comments.concat(newComment._id);
        await user.save();
        await post.save();
      }
      res.send(newComment);
    } else {
      throw { status: 400, message: 'content is missing..' };
    }
  } catch (error) {
    next(error);
  }
};

export { addAComment };
