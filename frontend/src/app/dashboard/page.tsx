"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Activity, Users, Globe, CheckCircle2, Bot, MessageSquare, CreditCard, Zap, Link as LinkIcon, Star } from 'lucide-react';
import { useAuth } from '@/lib/hooks';

export default function DashHome() {
  const { userName } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'plan' | 'gbp'>('overview');

  // Clean empty state data
  const stats = { activeProjects: 0, totalDeploys: 0, teamMembers: 0, activeDomains: 0 };
  const logs: any[] = [];
  const projects: any[] = [];
  
  // Clean GBP State
  const [gbpConnected, setGbpConnected] = useState(false);
  const reviews: any[] = [];

  return (
    <>
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Welcome back, {userName || 'User'} 👋</h1>
          <p className="text-gray-500 mt-1">Manage your infrastructure, plan, and business integrations.</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto overflow-x-auto">
          {['overview', 'plan', 'gbp'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
              {tab === 'overview' ? 'Overview' : tab === 'plan' ? 'Plan & Limits' : 'Google Business'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {[
              { title: 'Active Projects', value: stats.activeProjects, icon: FolderKanban, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'Total Deploys', value: stats.totalDeploys, icon: Activity, color: 'text-green-600', bg: 'bg-green-50' },
              { title: 'Team Members', value: stats.teamMembers, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
              { title: 'Domains', value: stats.activeDomains, icon: Globe, color: 'text-orange-600', bg: 'bg-orange-50' },
            ].map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center bg-gray-50"><s.icon className={`w-5 h-5 ${s.color}`} /></div>
                <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                <p className="text-sm text-gray-500 mt-1">{s.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Projects</h3>
              {projects.length === 0 ? (
                <div className="text-center py-12">
                  <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No projects yet. Create your first project!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Project mapping would go here */}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Activity Log</h3>
              {logs.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No activity yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Logs mapping would go here */}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'plan' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/10">
            <div>
              <span className="bg-white/20 text-blue-50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">Current Plan</span>
              <h2 className="text-3xl font-extrabold mb-2">Free Plan</h2>
              <p className="text-blue-100">You are on the Free plan. Upgrade for more limits and features.</p>
            </div>
            <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center gap-2">
              <Zap className="w-4 h-4" /> Upgrade Plan
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-blue-600" /> Usage & Limits</h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">API Requests</span><span className="text-gray-500">0 / 500</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Workspaces</span><span className="text-gray-500">0 / 1</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2"><span className="font-semibold text-gray-700">Team Members</span><span className="text-gray-500">1 / 1</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2"><CreditCard className="w-5 h-5 text-blue-500" /> Free Features</h3>
              <ul className="space-y-4">
                {['1 Workspace', '500 API requests/mo', 'NVIDIA AI (Llama 3.1) only', 'Community support', 'Basic analytics'].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'gbp' && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          
          {!gbpConnected ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-10 text-center shadow-sm">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Connect Google Business Profile</h2>
              <p className="text-gray-600 max-w-lg mx-auto mb-8">Manage your Google reviews directly from NexusSaaS. Use our Multi-Model AI Router to generate professional, context-aware auto-replies to both positive and negative reviews instantly.</p>
              <button onClick={() => setGbpConnected(true)} className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg">
                <LinkIcon className="w-5 h-5" /> Connect with Google
              </button>
            </div>
          ) : (
            <>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-green-600 font-bold text-xl">G</div>
                  <div>
                    <h3 className="font-bold text-gray-900">Google Profile Connected</h3>
                    <p className="text-sm text-green-700 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Ready to sync reviews</p>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-2xl font-black text-gray-900 flex items-center justify-end gap-1"><Star className="w-5 h-5 text-yellow-400 fill-yellow-400" /> 0.0</p>
                  <p className="text-sm text-gray-500">0 Total Reviews</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2"><MessageSquare className="w-5 h-5 text-blue-600" /> Recent Reviews</h3>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">AI Auto-Reply Enabled</span>
                </div>
                
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 font-medium">No reviews found</p>
                    <p className="text-sm text-gray-400 mt-1">When customers leave reviews, they will appear here.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {/* Reviews will be mapped here */}
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      )}
    </>
  );
}
