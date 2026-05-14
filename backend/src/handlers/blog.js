import connectToDatabase from '../_mongodb.js';
import { BlogPost } from '../_models.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    await connectToDatabase();
    if (req.method === 'GET') {
      const { slug, category } = req.query;
      let data;
      if (slug) {
        data = await BlogPost.findOne({ slug });
      } else {
        let filter = {};
        if (category) filter.category = category;
        data = await BlogPost.find(filter).sort({ published_at: -1 });
      }
      return res.status(200).json(data);
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
