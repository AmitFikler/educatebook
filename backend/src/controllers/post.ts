import { Request, Response, NextFunction } from 'express';
import { Post } from '../models/Post';
import {
  createNewPost,
  deletePostService,
  likeAPostService,
} from '../services/postServices';

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
    const posts = await Post.find({}); // get all posts
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.decodedToken;
  const { id } = req.params;
  try {
    const deleted = await deletePostService(id, decodedToken!.id);
    res.status(204).send(deleted);
  } catch (error) {
    next(error);
  }
};

export { postAPost, likeAPost, getAllPosts, deletePost };
