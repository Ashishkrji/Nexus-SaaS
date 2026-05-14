import connectToDatabase from '../_mongodb.js';
import { Lead } from '../_models.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectToDatabase();
    if (req.method === 'POST') {
      const { name, email, company, plan } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
      
      const lead = await Lead.create({ name, email, company, plan });
      return res.status(201).json(lead);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
