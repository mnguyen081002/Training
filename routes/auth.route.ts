import express, { Request, Response } from 'express';
import { AccountData } from '../middleware/read-data';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import path from '../constant';
import fs from 'fs';

const router = express.Router();

router.post('/sign-up', (req: Request, res: Response) => {
  const accounts = res.locals.accounts as Array<AccountData>;

  if (accounts.some((e) => e.username === req.body.username)) {
    return res.send({ message: 'Username already exists' });
  }
  accounts.push(req.body);

  const json = JSON.stringify(accounts);

  fs.writeFileSync(path, json);
  res.send({ message: 'Sign Up Successfully' });
});

router.post('/sign-in', (req: Request, res: Response) => {
  const accounts = res.locals.accounts as Array<AccountData>;
  const user = accounts.find((account) => account.username === req.body.username);
  if (!user) {
    return res.status(401).send({ message: 'User not found' });
  }

  if (user.password == req.body.password) {
    const accessToken = jwt.sign({ username: user.username }, config.secret);

    res.send({
      username: req.body.username,
      token: accessToken,
    });
  }
});

export default router;
