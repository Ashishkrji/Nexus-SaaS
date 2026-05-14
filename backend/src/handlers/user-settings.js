import connectToDatabase from '../_mongodb.js';
import { UserSettings } from '../_models.js';
import { authMiddleware } from '../_auth_middleware.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, OPTIONS');
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
      let settings = await UserSettings.findOne({ user_id: user.id });
      if (!settings) {
        settings = await UserSettings.create({ user_id: user.id });
      }
      return res.status(200).json(settings);
    }
    if (req.method === 'PATCH') {
      const body = req.body;
      delete body._id;
      delete body.user_id;
      delete body.created_at;
      
      const settings = await UserSettings.findOneAndUpdate(
        { user_id: user.id },
        { $set: { ...body, updated_at: new Date() } },
        { new: true, upsert: true }
      );
      
      return res.status(200).json(settings);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
