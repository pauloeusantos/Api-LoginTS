import { Request, Response, NextFunction } from 'express';
import UserService from '../service/service';
import createError from "http-errors";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    const { nome, email, senha } = req.body;
    try {
        const user = await UserService.register({ nome, email, senha });
        res.status(201).json(user);
    } catch (error) {
        next(createError(400, (error as Error).message));
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, senha } = req.body;
    try {
        const token = await UserService.login(email, senha);
        res.status(200).json({ token });
    } catch (error) {
        next(createError(401, (error as Error).message));
    }
};