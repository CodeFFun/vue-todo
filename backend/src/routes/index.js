import express from 'express';
import todoRouter from './todo.js';
import userRouter from './user.js';

const router = express.Router();

router.use('/todo', todoRouter)
router.use('/user', userRouter)

export default router;