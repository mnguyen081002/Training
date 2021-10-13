import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { getRepository } from 'typeorm';
import { User } from '../entity/User';
import AuthService from '../services/auth.service';
import logger from '../config/logger';

const router = express.Router();

router.post('/sign-up', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await AuthService.signUp(username, password);

  res.send({ message: 'Sign Up Successfully', data: { user } });
});

router.post('/sign-in', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await AuthService.signIn(username, password);
  res.send({ message: 'Login Successfully', token });
});

export default router;
