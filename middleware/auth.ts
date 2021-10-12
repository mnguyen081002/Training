import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { AccountData } from "./read-data";

const verifyCallback =
  (resolve: any, reject: any, res: Response) =>
  (err: Error, user: AccountData) => {
    if (!user || err) {
      res.status(404).send({ message: "Please authenticate" });
      reject(err);
    }

    res.locals.user = user;
    resolve();
  };

const auth = async (req: Request, res: Response, next: NextFunction) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(resolve, reject, res)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => res.status(500).send(err));
};

export default auth;
