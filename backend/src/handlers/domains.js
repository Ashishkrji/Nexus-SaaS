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
      const { data, error } = await supabase.from('domains').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'POST') {
      const { domain, ssl_enabled } = req.body;
      if (!domain) return res.status(400).json({ error: 'Domain is required' });
      const { data, error } = await supabase.from('domains').insert({ domain, ssl_enabled: ssl_enabled !== false, user_id: user.id, status: 'Pending', dns_verified: false }).select().single();
      if (error) throw error;
      return res.status(201).json(data);
    }
    if (req.method === 'PATCH') {
      const { id, domain, ssl_enabled, status, dns_verified } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      const updates: Record<string, any> = {};
      if (domain) updates.domain = domain;
      if (ssl_enabled !== undefined) updates.ssl_enabled = ssl_enabled;
      if (status) updates.status = status;
      if (dns_verified !== undefined) updates.dns_verified = dns_verified;
      const { data, error } = await supabase.from('domains').update(updates).eq('id', id).eq('user_id', user.id).select().single();
      if (error) throw error;
      return res.status(200).json(data);
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: 'ID is required' });
      const { error } = await supabase.from('domains').delete().eq('id', id).eq('user_id', user.id);
      if (error) throw error;
      return res.status(200).json({ ok: true });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
