import express from 'express';
import {
  postAPost,
  likeAPost,
  getAllPosts,
  deletePost,
  getOnePost,
} from '../controllers/post';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getOnePost);
router.post('/', userFinder, postAPost);
router.put('/like', userFinder, likeAPost);
router.delete('/:id', userFinder, deletePost);

export default router;
