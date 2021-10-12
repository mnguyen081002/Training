import fs from "fs";
import { StrategyOptions, ExtractJwt, Strategy } from "passport-jwt";
import path from "../constant";
import { AccountData } from "../middleware/read-data";
import config from "./config";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

const jwtVerify = async (payload: AccountData, done: any) => {
  try {
    const file = fs.readFileSync(path, "utf8");
    const accounts = JSON.parse(file) as AccountData[];

    const user = accounts.find(
      (account) => account.username === payload.username
    );

    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    console.log(error);
  }
};
const jwtStrategy = new Strategy(opts, jwtVerify);

export default jwtStrategy;
