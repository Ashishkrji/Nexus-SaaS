import { Router } from 'express';
import { getDashboardData } from '../controllers/dashboard.controller.js';
// import { protect } from '../middleware/auth.middleware.js'; // Assuming you have auth middleware

const router = Router();

// router.get('/', protect, getDashboardData);
router.get('/', getDashboardData); // Temporary without protection to test

export default router;
