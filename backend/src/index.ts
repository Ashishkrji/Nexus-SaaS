import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';
import { setupCronJobs } from './jobs/cron.setup.js';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import reviewRoutes from './routes/review.routes.js';
import postRoutes from './routes/post.routes.js';
import projectRoutes from './routes/project.routes.js';
import domainRoutes from './routes/domain.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { User } from './models/User.model.js';

// Load env vars
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.json({
    name: 'NexusSaaS API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      dashboard: '/api/dashboard',
      reviews: '/api/reviews',
      posts: '/api/posts',
      projects: '/api/projects',
      domains: '/api/domains',
      ai: '/api/ai',
      team: '/api/team',
    }
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/ai', aiRoutes);

// Simple Team Route
app.get('/api/team', async (req, res) => {
  try {
    const users = await User.find({}, 'name email role createdAt avatar');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team' });
  }
});

// Setup Cron Jobs
setupCronJobs();

// Start Server
app.listen(PORT, () => {
  logger.info(`NexusSaaS API running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
