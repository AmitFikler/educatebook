import express from 'express';
import { getAllUsers, addNewUser } from '../controllers/user';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/', addNewUser);

export default router;
