import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Review } from './src/models/Review.model.js';
import { Post } from './src/models/Post.model.js';
import { User } from './src/models/User.model.js';
import { Project } from './src/models/Project.model.js';
import { Domain } from './src/models/Domain.model.js';

dotenv.config();

const seedData = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI is not defined');

    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    // Get a user to associate with
    const user = await User.findOne();
    if (!user) throw new Error('No user found. Please register first.');

    // Clear existing data
    await Review.deleteMany({});
    await Post.deleteMany({});
    await Project.deleteMany({});
    await Domain.deleteMany({});
    
    // Create Reviews
    await Review.create([
      { googleId: 'rev_1', authorName: 'David Miller', rating: 5, comment: 'Excellent service!', replyStatus: 'PENDING', postedAt: new Date() },
      { googleId: 'rev_2', authorName: 'Jessica Thorne', rating: 4, comment: 'Great platform.', replyText: 'Thanks!', replyStatus: 'POSTED', postedAt: new Date(Date.now() - 86400000) }
    ]);

    // Create Projects
    await Project.create([
      { name: 'Nexus Core', status: 'ACTIVE', environment: 'PRODUCTION', deploys: 42, branch: 'main', userId: user._id },
      { name: 'Nexus Analytics', status: 'ACTIVE', environment: 'STAGING', deploys: 12, branch: 'develop', userId: user._id }
    ]);

    // Create Domains
    await Domain.create([
      { name: 'nexussaas.com', status: 'HEALTHY', sslStatus: 'VALID', dnsStatus: 'VERIFIED', provider: 'Cloudflare', userId: user._id },
      { name: 'app.nexussaas.com', status: 'HEALTHY', sslStatus: 'VALID', dnsStatus: 'VERIFIED', provider: 'Vercel', userId: user._id }
    ]);

    // Create Posts
    await Post.create([
      { type: 'WHATS_NEW', body: 'Live with MongoDB!', status: 'PUBLISHED', publishedAt: new Date(), userId: user._id }
    ]);

    console.log('Database seeded with real models successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();
