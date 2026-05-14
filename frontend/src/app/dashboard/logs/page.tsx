"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Search, Filter, Download, Terminal, AlertCircle, CheckCircle2, Info, Clock, Play } from 'lucide-react';

const logs = [
  { id: 1, type: 'info', action: 'User login', user: 'alokkumar2122@gmail.com', ip: '192.168.1.1', timestamp: '2024-05-03 16:10:42', details: 'Session started via Chrome on Windows' },
  { id: 2, type: 'success', action: 'Build completed', user: 'System', ip: '-', timestamp: '2024-05-03 16:05:12', details: 'Production build for Nexus Core successful (42s)' },
  { id: 3, type: 'error', action: 'API Error', user: 'Sudha Kumari', ip: '192.168.1.5', timestamp: '2024-05-03 15:45:00', details: 'GET /api/v1/analytics returned 500' },
  { id: 4, type: 'warning', action: 'Unauthorized access', user: 'Unknown', ip: '45.12.84.1', timestamp: '2024-05-03 15:30:22', details: 'Failed login attempt for admin' },
  { id: 5, type: 'info', action: 'GBP Post Created', user: 'Alok Kumar', ip: '192.168.1.1', timestamp: '2024-05-03 14:20:00', details: 'Post "Summer Sale" scheduled for New York location' },
];

export default function LogsPage() {
  const [activeType, setActiveType] = useState('all');

  const getTypeStyle = (type: string) => {
    switch(type) {
      case 'success': return { icon: CheckCircle2, color: 'text-green-500', bg: 'bg-green-50' };
      case 'error': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' };
      case 'warning': return { icon: AlertCircle, color: 'text-orange-500', bg: 'bg-orange-50' };
      default: return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' };
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">System Logs</h1>
          <p className="text-gray-500 mt-1">Audit logs and system activity for your account.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 border border-gray-100 rounded-xl hover:bg-gray-50 transition-all">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-all">
            <Terminal className="w-4 h-4" /> Live Tail
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 bg-gray-50 rounded-lg border border-gray-100">
            {['all', 'info', 'success', 'warning', 'error'].map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 text-xs font-bold rounded-md capitalize transition-all ${activeType === type ? 'bg-white text-gray-900 shadow-sm border border-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {type}
              </button>
            ))}
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search logs by action, user or details..." className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Type</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">User / IP</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Timestamp</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => {
                const style = getTypeStyle(log.type);
                return (
                  <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/30 transition-colors font-mono">
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${style.bg} ${style.color}`}>
                        <style.icon className="w-3 h-3" />
                        {log.type}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-900">{log.action}</td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-gray-700 font-medium">{log.user}</p>
                      <p className="text-[10px] text-gray-400">{log.ip}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">{log.timestamp}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 max-w-xs truncate">{log.details}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <p className="text-xs text-gray-500 font-medium italic flex items-center gap-2">
            <Clock className="w-3 h-3" /> Showing last 1,000 logs
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Prev</button>
            <button className="px-3 py-1 text-xs font-bold text-blue-600 bg-white border border-gray-100 rounded shadow-sm">1</button>
            <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">2</button>
            <button className="px-3 py-1 text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
