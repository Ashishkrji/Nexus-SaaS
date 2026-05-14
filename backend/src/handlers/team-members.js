import connectToDatabase from '../_mongodb.js';
import { TeamMember } from '../_models.js';
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
      const members = await TeamMember.find({ owner_id: user.id }).sort({ created_at: 1 });
      return res.status(200).json(members);
    }
    if (req.method === 'POST') {
      const { name, email, role } = req.body;
      if (!name || !role) return res.status(400).json({ error: 'Name and role are required' });
      
      const member = await TeamMember.create({
        name,
        email,
        role,
        owner_id: user.id,
        status: 'Active'
      });
      
      return res.status(201).json(member);
    }
    if (req.method === 'PATCH') {
      const { id, name, email, role, status } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (status) updates.status = status;
      
      const member = await TeamMember.findOneAndUpdate(
        { _id: id, owner_id: user.id },
        { $set: updates },
        { new: true }
      );
      
      if (!member) return res.status(404).json({ error: 'Team member not found' });
      return res.status(200).json(member);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const result = await TeamMember.deleteOne({ _id: id, owner_id: user.id });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Team member not found' });
      
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
