import express from 'express';
import authRoutes from './auth.route';
import postRoutes from './post.route';
const router = express.Router();

router.use(authRoutes);
router.use(postRoutes);
export default router;
