import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { AccountData } from './read-data';

const verifyCallback = (resolve: any, reject: any, res: Response) => (err: Error, user: AccountData) => {
  if (!user || err) {
    throw Error('Please authentication');
    reject(err);
  }

  res.locals.user = user;
  resolve();
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(resolve, reject, res))(req, res, next);
  })
    .then(() => next())
    .catch((err) => res.status(500).send({ message: err.message }));
};

export default auth;
