import { StrategyOptions, ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entity/User';
import config from './config';
import logger from './logger';

interface IPayload {
  id: string;
  username: string;
}

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret,
};

const jwtVerify = async (payload: IPayload, done: any) => {
  try {
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    logger.error(error);
  }
};
const jwtStrategy = new Strategy(opts, jwtVerify);

export default jwtStrategy;
