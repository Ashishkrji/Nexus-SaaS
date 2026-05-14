import { Request, Response } from 'express';
import { Project } from '../models/Project.model.js';
import { logger } from '../config/logger.js';

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ updatedAt: -1 });
    res.json(projects);
  } catch (error) {
    logger.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.create({ ...req.body, userId: (req as any).user?.id });
    res.status(201).json(project);
  } catch (error) {
    logger.error('Error creating project:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
