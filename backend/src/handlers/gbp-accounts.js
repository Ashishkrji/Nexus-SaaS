import connectToDatabase from '../_mongodb.js';
import { GBPAccount } from '../_models.js';
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
      const accounts = await GBPAccount.find({ user_id: user.id }).sort({ created_at: -1 });
      return res.status(200).json(accounts);
    }
    if (req.method === 'POST') {
      const { business_name, business_address, business_phone, business_category, business_description, business_website, business_tags, google_email, google_connected } = req.body;
      if (!business_name) return res.status(400).json({ error: 'Business name is required' });
      
      const account = await GBPAccount.create({
        user_id: user.id,
        business_name,
        business_address: business_address || '',
        business_phone: business_phone || '',
        business_category: business_category || '',
        business_description: business_description || '',
        business_website: business_website || '',
        business_tags: business_tags || [],
        google_email: google_email || '',
        google_connected: google_connected || false,
        status: 'connected',
        rating: 0,
        review_count: 0
      });
      
      return res.status(201).json(account);
    }
    if (req.method === 'PATCH') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const account = await GBPAccount.findOneAndUpdate(
        { _id: id, user_id: user.id },
        { $set: { ...updates, updated_at: new Date() } },
        { new: true }
      );
      
      if (!account) return res.status(404).json({ error: 'Account not found' });
      return res.status(200).json(account);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      
      const result = await GBPAccount.deleteOne({ _id: id, user_id: user.id });
      if (result.deletedCount === 0) return res.status(404).json({ error: 'Account not found' });
      
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
