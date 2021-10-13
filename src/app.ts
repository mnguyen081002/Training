import express from 'express';
import passport from 'passport';
import jwtStrategy from './config/passport';
import { errorHandler } from './middleware/error';
import router from './routes';
import ApiError from './utils/ApiError';
const app = express();

app.use(express.json());

app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(router);

app.use((req, res, next) => {
  next(new ApiError(404, 'Not found'));
});
app.use(errorHandler);
export default app;
