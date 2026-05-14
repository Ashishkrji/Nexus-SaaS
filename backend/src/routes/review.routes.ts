import { Router } from 'express';
import { getReviews, updateReviewReply } from '../controllers/review.controller.js';

const router = Router();

router.get('/', getReviews);
router.patch('/:id', updateReviewReply);

export default router;
