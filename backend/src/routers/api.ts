import express from 'express';

import userRouter from './user';
import loginRouter from './login';
import postRouter from './post';
import commentRouter from './comment';
import messageRouter from './message';

const router = express.Router();

router.use('/user', userRouter);
router.use('/login', loginRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/message', messageRouter);

export default router;
