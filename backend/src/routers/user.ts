import express from 'express';
import { getAllUsers, addNewUser, userFromToken } from '../controllers/user';
import { userFinder } from '../utils/middleware/user';

const router = express.Router();
router.get('/userFromToken', userFinder, userFromToken);
router.get('/', getAllUsers);
router.post('/', addNewUser);

export default router;
