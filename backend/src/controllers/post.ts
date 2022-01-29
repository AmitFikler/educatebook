import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import { User } from '../models/User';
import { createNewPost, likeAPostService } from '../services/postServices';

const postAPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { title, content } = req.body; // get title and content from body
    if (title && content) {
      const newPost = await createNewPost(decodedToken!.id, title, content);
      res.status(201).json(newPost); // send new post
    } else {
      throw { status: 400, message: 'title or content is missing..' };
    }
  } catch (error) {
    next(error);
  }
};

const likeAPost = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.body; // get postId from body
  try {
    const postToLike = await likeAPostService(postId);
    res.send(`${postId} has ${postToLike!.likes + 1} likes`);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await Post.find({}); // find all posts
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.decodedToken;
  const { id } = req.params;
  try {
    const postToDelete = await Post.findById(id);
    if (postToDelete?.usernameId == decodedToken!.id) {
      // Verifies if the user's post
      await Post.findByIdAndDelete(id); // delete post from Posts
      User.findByIdAndUpdate(
        //TODO handle if invalid id
        decodedToken!.id,
        { $pullAll: { posts: [id] } },
        (err, data) => {
          if (!err) {
            res.status(204).send(`${id} delete`); // TODO async/await or cb
          }
        }
      ).clone();
    } else {
      throw {
        status: 401,
        message: 'You are not authorized to delete this post',
      };
    }
  } catch (error) {
    next(error);
  }
};

export { postAPost, likeAPost, getAllPosts, deletePost };
