import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';

const postAPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { title, content } = req.body;
    if (title && content) {
      const newPost = await Post.create({
        usernameId: decodedToken!.id,
        title,
        content,
      });
      const user = await User.findById(decodedToken!.id);
      if (user?.posts) {
        user.posts = user?.posts.concat(newPost._id);
        await user.save();
      }
      res.send(newPost);
    } else {
      throw { status: 400, message: 'title or content is missing..' };
    }
  } catch (error) {
    next(error);
  }
};

export { postAPost };
