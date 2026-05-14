import { Request, Response } from 'express';
import { Post } from '../models/Post.model.js';
import { logger } from '../config/logger.js';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find().sort({ scheduledAt: -1 });
    res.json(posts);
  } catch (error) {
    logger.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    logger.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
