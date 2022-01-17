import express from 'express';
import { handleLogin } from '../controllers/login';

const router = express.Router();

router.post('/', handleLogin);

export default router;
