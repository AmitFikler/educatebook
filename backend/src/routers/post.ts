import express from 'express';
import { postAPost, likeAPost } from '../controllers/post';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.post('/', userFinder, postAPost);
router.put('/like', likeAPost);

export default router;
