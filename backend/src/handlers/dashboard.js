import connectToDatabase from '../_mongodb.js';
import { Project, TeamMember, Domain, ActivityLog } from '../_models.js';
import { authMiddleware } from '../_auth_middleware.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
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
      const [projects, team, domains, recentLogs] = await Promise.all([
        Project.find({ user_id: user.id }),
        TeamMember.find({ owner_id: user.id }),
        Domain.find({ user_id: user.id }),
        ActivityLog.find({ user_id: user.id }).sort({ created_at: -1 }).limit(10),
      ]);

      const totalDeploys = projects.reduce((sum, p) => sum + (p.deploys || 0), 0);
      const activeProjects = projects.filter(p => p.status === 'Active').length;
      const activeDomains = domains.filter(d => d.status === 'Active').length;

      return res.status(200).json({
        stats: {
          activeProjects,
          totalProjects: projects.length,
          totalDeploys,
          teamMembers: team.length,
          domains: domains.length,
          activeDomains,
        },
        recentLogs,
        projects,
      });
    }
    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API error:', err);
    res.status(500).json({ error: err.message });
  }
}
