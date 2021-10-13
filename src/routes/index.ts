import express from 'express';
import auth from '../middleware/auth';
import authRoutes from './auth.route';
import postRoutes from './post.route';
const router = express.Router();

router.use(authRoutes);
router.use(auth, postRoutes);
export default router;
