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
  const { postId, likes, type } = req.body; // get postId, likes and type from body
  const decodedToken = req.decodedToken;
  try {
    const postToLike = await likeAPostService(
      postId,
      decodedToken!.id,
      Number(likes),
      type
    );
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
    const posts = await Post.find({})
      .populate({
        path: 'usernameId',
        select: ['fullName', 'role'],
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'usernameId',
          select: ['fullName', 'role'],
        },
      }); // get all posts
    res.json(posts);
  } catch (error) {
    next(error);
  }
};

const getOnePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id)
      .populate({
        path: 'usernameId',
        select: ['fullName', 'role'],
      })
      .populate({
        path: 'comments',
        populate: {
          path: 'usernameId',
          select: ['fullName', 'role'],
        },
      }); // get all posts
    res.json(post);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  const decodedToken = req.decodedToken;
  const { id } = req.params;
  try {
    await deletePostService(id, decodedToken!.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { postAPost, likeAPost, getAllPosts, deletePost, getOnePost };
