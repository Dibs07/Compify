import express from 'express';
import { getProfile, login, logout, signup } from '../controller/user.controller';
import { isAuthenticated } from '../middleware/verify-user';

const userRouter = express.Router();
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.post('/logout', logout);
userRouter.get('/get-profile', isAuthenticated, getProfile);

export default userRouter;