import express from 'express';
import authRoutes from './auth.route';
import auth from '../middleware/auth';
import userRoutes from './user.route';
const router = express.Router();

router.use(authRoutes);
router.use(auth, userRoutes);
export default router;
