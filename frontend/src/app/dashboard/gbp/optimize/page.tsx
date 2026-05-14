"use client";

import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, AlertCircle, Info, ArrowUpRight, BarChart3, Search, Zap } from 'lucide-react';

const optimizations = [
  { id: 1, title: 'Add missing business hours', impact: 'High', status: 'Pending', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 2, title: 'Upload new interior photos', impact: 'Medium', status: 'Pending', icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 3, title: 'Primary category optimization', impact: 'Critical', status: 'Completed', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
  { id: 4, title: 'Optimize business description', impact: 'High', status: 'Completed', icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' },
];

export default function GBPOptimizePage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-sans">GBP Optimize</h1>
          <p className="text-gray-500 mt-1">AI-powered suggestions to boost your local SEO rankings.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all">
          <Zap className="w-5 h-5 fill-current" />
          Run AI Audit
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Optimization Score</h3>
                  <p className="text-sm text-gray-500 mt-1">Based on profile completeness and keyword relevance.</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-blue-600">84<span className="text-xl text-gray-300">/100</span></p>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1 mt-1 justify-end">
                    <ArrowUpRight className="w-3 h-3" /> +12% since last audit
                  </span>
                </div>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '84%' }} transition={{ duration: 1, ease: 'easeOut' }} className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" />
              </div>
              <div className="grid grid-cols-4 gap-4 mt-8 pt-8 border-t border-gray-50">
                {['Keywords', 'Images', 'Service Area', 'Attributes'].map((item) => (
                  <div key={item} className="text-center">
                    <p className="text-sm font-bold text-gray-900">Good</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase mt-1 tracking-wider">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-base font-bold text-gray-900">AI Optimization Tasks</h3>
              <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-bold uppercase tracking-wider">2 Pending</span>
            </div>
            <div className="divide-y divide-gray-100">
              {optimizations.map((task) => (
                <div key={task.id} className="p-5 flex items-center gap-5 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <div className={`w-10 h-10 rounded-xl ${task.bg} flex items-center justify-center flex-shrink-0`}>
                    <task.icon className={`w-5 h-5 ${task.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{task.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Impact: {task.impact}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${task.status === 'Completed' ? 'text-green-500' : 'text-orange-500'}`}>{task.status}</span>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 text-xs font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                    Apply Fix
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" /> Keyword Rankings
            </h3>
            <div className="space-y-4">
              {[
                { term: 'SaaS Platform NY', rank: '#2', trend: 'up' },
                { term: 'Cloud Hosting', rank: '#8', trend: 'up' },
                { term: 'Enterprise Software', rank: '#14', trend: 'down' },
                { term: 'DevOps Services', rank: '#5', trend: 'stable' },
              ].map((k) => (
                <div key={k.term} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-700">{k.term}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-900">{k.rank}</span>
                    <div className={`w-2 h-2 rounded-full ${k.trend === 'up' ? 'bg-green-500' : k.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'}`} />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all">
              Manage Keywords
            </button>
          </div>

          <div className="bg-indigo-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-indigo-200" />
              </div>
              <h3 className="text-lg font-bold mb-2">Smart Insights</h3>
              <p className="text-sm text-indigo-200 mb-6">Users searching for "SaaS Platform" are 3x more likely to convert in your area.</p>
              <button className="text-sm font-bold text-white flex items-center gap-2 hover:translate-x-1 transition-transform">
                View Deep Audit <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
