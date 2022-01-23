import express from 'express';
import {
  postAPost,
  likeAPost,
  getAllPosts,
  deletePost,
} from '../controllers/post';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', userFinder, postAPost);
router.put('/like', likeAPost);
router.delete('/:id', userFinder, deletePost);

export default router;
