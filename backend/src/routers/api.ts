import express from 'express';

import userRouter from './user';
import loginRouter from './login';

const router = express.Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);

export default router;
