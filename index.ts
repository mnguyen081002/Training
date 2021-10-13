import express from 'express';
import readData from './middleware/read-data';
import router from './routes';
import passport from 'passport';
import jwtStrategy from './config/passport';
import logger from './config/logger';
const app = express();

app.use(express.json());

app.use(readData);
app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(router);

app.listen(3000, () => {
  logger.info('Server listening on port 3000');
});
