import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Mock Dashboard Data
  return NextResponse.json({
    stats: { 
      activeProjects: 3, 
      totalProjects: 5, 
      totalDeploys: 142, 
      teamMembers: 5, 
      domains: 10, 
      activeDomains: 3 
    },
    recentLogs: [
      { id: 1, action: 'Deployment Successful', resource: 'production-app-1', details: 'Commit 4f7c2b deployed', status: 'success', created_at: new Date(Date.now() - 5 * 60000).toISOString() },
      { id: 2, action: 'Configuration Updated', resource: 'staging-api', details: 'Environment variables changed', status: 'info', created_at: new Date(Date.now() - 120 * 60000).toISOString() },
      { id: 3, action: 'Build Failed', resource: 'worker-service', details: 'NPM install failed', status: 'error', created_at: new Date(Date.now() - 360 * 60000).toISOString() },
      { id: 4, action: 'New Team Member', resource: 'Team Settings', details: 'Sarah joined the team', status: 'success', created_at: new Date(Date.now() - 1440 * 60000).toISOString() },
    ],
    projects: [
      { id: 1, name: 'Nexus Core Platform', status: 'Active', environment: 'Production', deploys: 89, branch: 'main', updated_at: new Date().toISOString() },
      { id: 2, name: 'Marketing Website', status: 'Active', environment: 'Production', deploys: 45, branch: 'main', updated_at: new Date().toISOString() },
      { id: 3, name: 'API Gateway v2', status: 'Building', environment: 'Staging', deploys: 8, branch: 'feature/new-gateway', updated_at: new Date().toISOString() },
    ]
  });
}
