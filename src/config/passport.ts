import { StrategyOptions, ExtractJwt, Strategy } from 'passport-jwt';
import config from './config';

interface IPayload {
  userId: string;
  username: string;
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

const jwtVerify = async (payload: IPayload, done: any) => {
  try {
    // if (user) {
    //   return done(null, user);
    // }

    return done(null, false);
  } catch (error) {
    console.log(error);
  }
};
const jwtStrategy = new Strategy(opts, jwtVerify);

export default jwtStrategy;
