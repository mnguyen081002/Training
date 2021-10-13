import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import logger from '../config/logger';
import { User } from '../entity/User';
import ApiError from '../utils/ApiError';

const verifyCallback = (resolve: any, reject: any, req: Request) => (err: Error, user: User) => {
  if (!user || err) {
    return reject(new ApiError(401, 'Please authentication'));
  }
  req.user = user;
  resolve();
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', { session: false }, verifyCallback(resolve, reject, req))(req, res, next);
  })
    .then(() => next())
    .catch((err) => {
      next(err);
    });
};

export default auth;
