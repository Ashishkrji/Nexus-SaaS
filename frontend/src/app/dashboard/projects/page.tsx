"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Plus, Search, Filter, MoreVertical, ExternalLink, GitBranch, Globe, Activity, Clock } from 'lucide-react';
import { useAuth, useApi } from '@/lib/hooks';

export default function ProjectsPage() {
  const { token } = useAuth();
  const { data: projects, loading, error } = useApi('/api/projects', token);
  const [search, setSearch] = useState('');

  if (loading) return <div className="p-12 text-center font-bold text-gray-500">Loading projects...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-bold">Error: {error}</div>;

  const displayProjects = projects || [];
  const filteredProjects = displayProjects.filter((p: any) => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage and monitor your application deployments.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
          <Plus className="w-5 h-5" />
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-blue-600">
            <Activity className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Total Deploys</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{displayProjects.reduce((acc: number, p: any) => acc + p.deploys, 0)}</p>
          <p className="text-sm text-green-600 font-medium mt-1">Live from database</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-purple-600">
            <Globe className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Active Projects</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">{displayProjects.filter((p: any) => p.status === 'ACTIVE').length}</p>
          <p className="text-sm text-gray-500 mt-1">Connected to MongoDB</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-orange-600">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-wider">Avg. Status</span>
          </div>
          <p className="text-3xl font-extrabold text-gray-900">HEALTHY</p>
          <p className="text-sm text-green-600 font-medium mt-1">System operational</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 rounded-xl transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Environment</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProjects.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No projects found. Add your first project to get started.</td></tr>
              ) : (
                filteredProjects.map((project: any) => (
                  <motion.tr key={project._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                          <FolderKanban className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{project.name}</p>
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-0.5">
                            <GitBranch className="w-3 h-3" />
                            <span>{project.branch}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${project.status === 'ACTIVE' ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-700">{project.environment}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.url && <a href={project.url} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><ExternalLink className="w-4 h-4" /></a>}
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
