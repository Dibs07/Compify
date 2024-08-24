import { Request, Response } from "express";
import * as argon2 from 'argon2';
import * as jwt from 'jsonwebtoken';
import { db } from "../db/db";

export const signup = async (req: Request, res: Response) => {
    try {

        const {
            name,
            email,
            password,
        } = req.body;

        const existsUser = await db.user.findFirst({
            where: {
                email: email
            }
        });

        if (existsUser)
            return res.status(401).json({
                message: 'User already exists'
            });

        const hashedPassword = await argon2.hash(password);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        if (!user)
            return res.status(500).json({
                message: 'Failed to create user'
            });

        const payload = {
            id: user.id,
            email: user.email
        };

        const secret = process.env.JWT_SECRET;
        const accessToken = jwt.sign(payload, secret as string);
        const returnUser = {
            name: user.name,
            email: user.email
        };
        res.cookie("acc_compify", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        console.log(res.cookie);
        return res
            .status(200)
            .json({
                user: returnUser
            });
    } catch (error) {
        console.log('[SIGNUP_ERROR]', error);
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const {
            email,
            password,
        } = req.body;

        const existsUser = await db.user.findFirst({
            where: {
                email
            }
        });

        if (!existsUser)
            return res.status(401).json({
                message: 'Invalid Credentials'
            });

        const isPassMatch = argon2.verify(existsUser.password, password);

        if (!isPassMatch) {
            return res.status(401).json({
                message: 'Inavlid credentials'
            });
        }

        const payload = {
            id: existsUser.id,
            email: existsUser.email
        };

        const secret = process.env.JWT_SECRET;
        const accessToken = jwt.sign(payload, secret as string);
        const returnUser = {
            name: existsUser.name,
            email: existsUser.email
        };
        res.cookie("acc_compify", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax'
        });
        return res
            .status(200)
            .json({
                user: returnUser
            });
    } catch (error) {
        console.log('[LOGIN_ERROR]', error);
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.status(200).cookie("acc_compify", "").json({ message: 'Logout successful' });
    } catch (error) {
        console.log('[LOGOUT_ERROR]', error);
    }
}

export const getProfile = (req: Request, res: Response) => {
    try {
        const user = req.user;
        console.log(user);
    } catch (error) {
        console.log('[GET_PROFILE_ERROR]', error);
    }
}