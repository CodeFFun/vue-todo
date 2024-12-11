import express from 'express';
import userController from '../controller/userController.js';

const userRouter = express.Router();
const controller = new userController();

userRouter.post('/login', controller.login)
userRouter.post('/register', controller.register)

export default userRouter;