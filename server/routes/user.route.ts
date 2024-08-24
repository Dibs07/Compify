import express from 'express';
import { getProfile, login, logout, signup } from '../controller/user.controller';
import { verifyToken } from '../middleware/verify-user';

const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/get-profile', verifyToken, getProfile);

export default userRouter;