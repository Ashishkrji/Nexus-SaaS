"use client";

import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Eye, MousePointer2, Clock, ArrowUpRight, ArrowDownRight, Globe } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Analytics</h1>
          <p className="text-gray-500 mt-1">Real-time performance metrics and user behavior insights.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
          {['24h', '7d', '30d', '90d'].map((range) => (
            <button key={range} className={`px-4 py-2 text-sm font-bold rounded-lg transition-all ${range === '7d' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Views', value: '142.8K', trend: '+14.2%', up: true, icon: Eye, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Unique Visitors', value: '84.2K', trend: '+8.1%', up: true, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Avg. Duration', value: '4m 32s', trend: '-2.4%', up: false, icon: Clock, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'CTR', value: '12.4%', trend: '+4.3%', up: true, icon: MousePointer2, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <span className={`text-xs font-bold flex items-center gap-0.5 ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-[400px] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-gray-900">Traffic Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-gray-500 font-medium">Page Views</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-purple-500" /><span className="text-xs text-gray-500 font-medium">Sessions</span></div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-2 pb-2">
            {[40, 60, 45, 80, 55, 90, 70, 85, 60, 75, 50, 65, 80, 95].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                <div className="w-full relative">
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.05, duration: 0.8 }} className="w-full bg-blue-100 rounded-t-lg group-hover:bg-blue-200 transition-colors" />
                  <motion.div initial={{ height: 0 }} animate={{ height: `${h * 0.6}%` }} transition={{ delay: i * 0.05 + 0.2, duration: 0.8 }} className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg shadow-lg shadow-blue-600/20" />
                </div>
                <span className="text-[10px] text-gray-400 font-bold">{10+i} May</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-8">Top Locations</h3>
          <div className="space-y-6 flex-1">
            {[
              { country: 'United States', code: 'US', percent: 64, color: 'bg-blue-600' },
              { country: 'Germany', code: 'DE', percent: 18, color: 'bg-purple-600' },
              { country: 'United Kingdom', code: 'GB', percent: 12, color: 'bg-indigo-600' },
              { country: 'India', code: 'IN', percent: 6, color: 'bg-orange-600' },
            ].map((loc) => (
              <div key={loc.country}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">{loc.code}</div>
                    <span className="text-sm font-bold text-gray-900">{loc.country}</span>
                  </div>
                  <span className="text-sm font-black text-gray-900">{loc.percent}%</span>
                </div>
                <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${loc.percent}%` }} transition={{ duration: 1 }} className={`h-full ${loc.color} rounded-full`} />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 border border-gray-100 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
            <Globe className="w-4 h-4" /> View Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
