import connectToDatabase from '../_mongodb.js';
import { Project } from '../_models.js';
import { authMiddleware } from '../_auth_middleware.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectToDatabase();
    
    // Use custom auth instead of Supabase
    let user;
    try {
      user = await authMiddleware(req);
    } catch (authError) {
      return res.status(401).json({ error: authError.message });
    }

    if (req.method === 'GET') {
      const projects = await Project.find({ user_id: user.id }).sort({ updated_at: -1 });
      return res.status(200).json(projects);
    }
    if (req.method === 'POST') {
      const { name, environment, branch } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });
      
      const project = await Project.create({
        name,
        environment: environment || 'Production',
        branch: branch || 'main',
        user_id: user.id,
        status: 'Active',
        deploys: 0
      });
      
      return res.status(201).json(project);
    }
    if (req.method === 'PATCH') {
      const { id, name, status, environment, branch } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const updates = { updated_at: new Date() };
      if (name) updates.name = name;
      if (status) updates.status = status;
      if (environment) updates.environment = environment;
      if (branch) updates.branch = branch;
      
      const project = await Project.findOneAndUpdate(
        { _id: id, user_id: user.id },
        { $set: updates },
        { new: true }
      );
      
      if (!project) return res.status(404).json({ error: 'Project not found' });
      return res.status(200).json(project);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const result = await Project.deleteOne({ _id: id, user_id: user.id });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Project not found' });
      
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
