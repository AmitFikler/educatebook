import express from 'express';
import { getAllMessages } from '../services/socketHelper';

const router = express.Router();

router.get('/:room', async (req, res, next) => {
  try {
    const { room } = req.params;
    const data = await getAllMessages(room);
    res.send(data);
  } catch (error) {
    next(error);
  }
});

export default router;
