import { Request, Response, NextFunction } from 'express';
import {
  commentAPost,
  deleteACommentService,
} from '../services/commentServices';

const addAComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const decodedToken = req.decodedToken;
    const { content, commentOn } = req.body;
    if (!(commentOn || content))
      throw { status: 400, message: 'content or commentOn is missing' };
    const newComment = await commentAPost(content, commentOn, decodedToken!.id);
    res.status(201).json(newComment);
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedToken = req.decodedToken;
    const { commentId } = req.params;
    if (!commentId) throw { status: 400, message: 'commentId is missing' }; // check if commentId is missing
    await deleteACommentService(commentId, decodedToken!.id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export { addAComment, deleteComment };
