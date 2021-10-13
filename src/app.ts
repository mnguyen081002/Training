import express from 'express';
import passport from 'passport';
import jwtStrategy from './config/passport';
import router from './routes';
const app = express();

app.use(express.json());

app.use(passport.initialize());
passport.use(jwtStrategy);
app.use(router);

export default app;
