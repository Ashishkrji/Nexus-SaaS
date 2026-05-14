import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectToDatabase from './_mongodb.js';

// Import handlers (from the handlers folder)
import projectsHandler from './handlers/projects.js';
import userSettingsHandler from './handlers/user-settings.js';
import activityLogsHandler from './handlers/activity-logs.js';
import teamMembersHandler from './handlers/team-members.js';
import testimonialsHandler from './handlers/testimonials.js';
import newsletterHandler from './handlers/newsletter.js';
import leadsHandler from './handlers/leads.js';
import pricingHandler from './handlers/pricing.js';
import blogHandler from './handlers/blog.js';
import aiGenerateHandler from './handlers/ai-generate.js';
import dashboardHandler from './handlers/dashboard.js';
import gbpAccountsHandler from './handlers/gbp-accounts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Database Connection
connectToDatabase();

// Helper to wrap Vercel-style handlers for Express
const wrap = (handler) => async (req, res) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

import bcrypt from 'bcryptjs';
import { User } from './_models.js';
import { generateToken } from './_auth_middleware.js';

// Auth Routes (New)
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'User already exists' });
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    
    const token = generateToken(user._id);
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const token = generateToken(user._id);
    res.status(200).json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Google OAuth — verify ID token and upsert user
app.post('/api/auth/google', async (req, res) => {
  const { credential } = req.body; // Google ID token (JWT)
  if (!credential) return res.status(400).json({ error: 'No credential provided' });
  try {
    // Verify the ID token with Google
    const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`);
    const payload = await verifyRes.json();
    if (!verifyRes.ok || !payload.email) return res.status(401).json({ error: 'Invalid Google token' });
    if (payload.aud !== process.env.VITE_GOOGLE_CLIENT_ID) return res.status(401).json({ error: 'Token audience mismatch' });

    // Upsert user
    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        name: payload.name || payload.email.split('@')[0],
        email: payload.email,
        password: await bcrypt.hash(Math.random().toString(36), 10), // random password — not used
        googleId: payload.sub,
      });
    } else if (!user.googleId) {
      user.googleId = payload.sub;
      await user.save();
    }

    const token = generateToken(user._id);
    res.status(200).json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Existing Routes
app.all('/api/projects', wrap(projectsHandler));
app.all('/api/user-settings', wrap(userSettingsHandler));
app.all('/api/activity-logs', wrap(activityLogsHandler));
app.all('/api/team-members', wrap(teamMembersHandler));
app.all('/api/testimonials', wrap(testimonialsHandler));
app.all('/api/newsletter', wrap(newsletterHandler));
app.all('/api/leads', wrap(leadsHandler));
app.all('/api/pricing', wrap(pricingHandler));
app.all('/api/blog', wrap(blogHandler));
app.post('/api/ai-generate', wrap(aiGenerateHandler));
app.get('/api/dashboard', wrap(dashboardHandler));
app.all('/api/gbp-accounts', wrap(gbpAccountsHandler));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
