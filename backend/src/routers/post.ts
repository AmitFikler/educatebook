import express from 'express';
import { postAPost } from '../controllers/post';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.post('/', userFinder, postAPost);

export default router;
