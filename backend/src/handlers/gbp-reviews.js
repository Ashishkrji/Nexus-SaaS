// import supabase from '../_supabase.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) return res.status(401).json({ error: 'Invalid token' });

    if (req.method === 'GET') {
      const { account_id } = req.query;
      let query = supabase.from('gbp_reviews').select('*').eq('user_id', user.id).order('review_date', { ascending: false });
      if (account_id) query = query.eq('account_id', account_id);
      const { data, error } = await query;
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { account_id, reviewer_name, rating, content, review_date } = req.body;
      if (!account_id || !content) return res.status(400).json({ error: 'Account ID and content are required' });
      const sentiment = rating >= 4 ? 'positive' : rating <= 2 ? 'negative' : 'neutral';
      const { data, error } = await supabase.from('gbp_reviews').insert({
        user_id: user.id, account_id, reviewer_name: reviewer_name || 'Anonymous', rating: rating || 3,
        content, sentiment, replied: false, review_date: review_date || new Date().toISOString()
      }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PATCH') {
      const { id, ...updates } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      const { data, error } = await supabase.from('gbp_reviews').update(updates).eq('id', id).eq('user_id', user.id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      const { error } = await supabase.from('gbp_reviews').delete().eq('id', id).eq('user_id', user.id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
