import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import AuthService from '../services/auth.service';
import logger from '../config/logger';
import catchAsync from '../utils/catchAsync';

const router = express.Router();

router.post(
  '/sign-up',
  catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await AuthService.signUp(username, password);

    res.send({ message: 'Sign Up Successfully', user });
  })
);

router.post(
  '/sign-in',
  catchAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const token = await AuthService.signIn(username, password);
    res.send({ message: 'Login Successfully', token });
  })
);

export default router;
