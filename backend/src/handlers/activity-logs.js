import connectToDatabase from '../_mongodb.js';
import { ActivityLog } from '../_models.js';
import { authMiddleware } from '../_auth_middleware.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
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
      const logs = await ActivityLog.find({ user_id: user.id }).sort({ created_at: -1 }).limit(100);
      return res.status(200).json(logs);
    }
    if (req.method === 'POST') {
      const { action, resource, details, status } = req.body;
      if (!action) return res.status(400).json({ error: 'Action is required' });
      
      const log = await ActivityLog.create({
        action,
        resource,
        details,
        status: status || 'info',
        user_id: user.id
      });
      
      return res.status(201).json(log);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
