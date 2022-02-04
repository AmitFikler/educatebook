import express from 'express';
import { addAComment, deleteComment } from '../controllers/comment';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.post('/', userFinder, addAComment);
router.delete('/:commentId', userFinder, deleteComment);

export default router;
