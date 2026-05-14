import connectToDatabase from '../_mongodb.js';
import { Newsletter } from '../_models.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectToDatabase();
    if (req.method === 'POST') {
      const { email } = req.body;
      if (!email) return res.status(400).json({ error: 'Email is required' });
      
      try {
        const subscriber = await Newsletter.create({ email });
        return res.status(201).json(subscriber);
      } catch (error) {
        if (error.code === 11000) return res.status(200).json({ ok: true, message: 'Already subscribed' });
        throw error;
      }
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
