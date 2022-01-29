import { Request, Response, NextFunction } from 'express';
import { commentAPost } from '../services/commentServices';

const addAComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { content, commentOn } = req.body;
    if (!(commentOn || content))
      throw { status: 400, message: 'content or commentOn is missing' };
    const newComment = await commentAPost(content, commentOn, decodedToken!.id);
    res.json(newComment);
  } catch (error) {
    next(error);
  }
};

export { addAComment };
