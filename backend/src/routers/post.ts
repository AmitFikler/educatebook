import express from 'express';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();

router.post('/', userFinder, postAPost);

export default router;
