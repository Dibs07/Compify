import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.token as string;
        console.log(token);
        if (!token)
            return res.status(401).json({
                message: 'User not authenticated'
            });

        const secret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, secret);

        if (!decoded)
            return res.status(401).json({
                message: 'User not authenicated'
            });
        req.user = decoded;
        next();
    } catch (error) {
        console.log('[MIDDLEWARE_ERROR]', error);
    }
}