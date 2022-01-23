import express from 'express';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.post('/', userFinder, addAComment);
router.delete('/:id', userFinder, deleteAComment);

export default router;
