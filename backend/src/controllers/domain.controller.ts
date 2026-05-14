import { Request, Response } from 'express';
import { Domain } from '../models/Domain.model.js';
import { logger } from '../config/logger.js';

export const getDomains = async (req: Request, res: Response) => {
  try {
    const domains = await Domain.find().sort({ name: 1 });
    res.json(domains);
  } catch (error) {
    logger.error('Error fetching domains:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addDomain = async (req: Request, res: Response) => {
  try {
    const domain = await Domain.create({ ...req.body, userId: (req as any).user?.id });
    res.status(201).json(domain);
  } catch (error) {
    logger.error('Error adding domain:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
