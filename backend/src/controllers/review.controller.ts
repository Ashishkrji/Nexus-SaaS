import { Request, Response } from 'express';
import { Review } from '../models/Review.model.js';
import { logger } from '../config/logger.js';

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().sort({ postedAt: -1 });
    res.json(reviews);
  } catch (error) {
    logger.error('Error fetching reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateReviewReply = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { replyText, replyStatus } = req.body;
    
    const review = await Review.findByIdAndUpdate(
      id, 
      { replyText, replyStatus, repliedAt: new Date() },
      { new: true }
    );
    
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.json(review);
  } catch (error) {
    logger.error('Error updating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
