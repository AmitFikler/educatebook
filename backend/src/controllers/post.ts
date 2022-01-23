import e, { Request, Response, NextFunction } from 'express';
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
      if (user) {
        user.posts = user.posts.concat(newPost._id);
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

const likeAPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.body;
  try {
    if (postId) {
      const post = await Post.findById(postId);
      if (post) {
        post.likes += 1;
        await post.save();
        res.send(`${postId} has ${post.likes} likes `);
      } else {
        throw { status: 404, message: 'Post not found' };
      }
    } else {
      throw { status: 400, message: 'Post id is missing' };
    }
  } catch (error) {
    next(error);
  }
};

export { postAPost, likeAPost };
