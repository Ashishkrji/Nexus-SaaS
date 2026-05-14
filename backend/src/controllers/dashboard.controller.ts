import { Request, Response } from 'express';

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Mock data for now to keep the frontend happy
    res.json({
      stats: {
        activeProjects: 3,
        totalProjects: 5,
        totalDeploys: 124,
        teamMembers: 8,
        domains: 12,
        activeDomains: 10
      },
      recentLogs: [
        { id: 1, action: 'Deployment Success', resource: 'Production', details: 'Vite build completed', status: 'success', created_at: new Date().toISOString() },
        { id: 2, action: 'New Domain Linked', resource: 'nexussaas.com', details: 'DNS verified', status: 'info', created_at: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, action: 'Team Member Joined', resource: 'Sarah Chen', details: 'Added to Engineering', status: 'success', created_at: new Date(Date.now() - 86400000).toISOString() }
      ],
      projects: [
        { id: 1, name: 'Nexus Core', status: 'Active', environment: 'Production', deploys: 42, branch: 'main', updated_at: new Date().toISOString() },
        { id: 2, name: 'Nexus Analytics', status: 'Active', environment: 'Staging', deploys: 12, branch: 'develop', updated_at: new Date().toISOString() }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
