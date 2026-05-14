"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, UserPlus, Mail, Shield, MoreVertical, Search, CheckCircle2 } from 'lucide-react';
import { useAuth, useApi } from '@/lib/hooks';

export default function TeamPage() {
  const { token } = useAuth();
  const { data: teamMembers, loading, error } = useApi('/api/team', token);
  const [search, setSearch] = useState('');

  if (loading) return <div className="p-12 text-center font-bold text-gray-500">Loading team members...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-bold">Error: {error}</div>;

  const displayMembers = teamMembers || [];
  const filteredMembers = displayMembers.filter((m: any) => 
    (m.name?.toLowerCase() || '').includes(search.toLowerCase()) || 
    m.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Team Management</h1>
          <p className="text-gray-500 mt-1">Manage your team members and their access levels.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
          <UserPlus className="w-5 h-5" />
          Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Members', value: displayMembers.length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Admins', value: displayMembers.filter((m: any) => m.role === 'ADMIN').length, icon: Shield, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Users', value: displayMembers.filter((m: any) => m.role === 'USER').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'New This Month', value: '1', icon: Mail, color: 'text-orange-600', bg: 'bg-orange-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-4`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 font-medium mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Member</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMembers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-500">No team members found.</td></tr>
              ) : (
                filteredMembers.map((member: any) => (
                  <motion.tr key={member._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                          {member.avatar ? <img src={member.avatar} className="w-full h-full rounded-full" /> : (member.name?.[0] || member.email[0]).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-900">{member.name || 'Anonymous'}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Shield className={`w-4 h-4 ${member.role === 'ADMIN' ? 'text-blue-500' : 'text-gray-400'}`} />
                        {member.role}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs text-gray-500 font-medium">
                        {new Date(member.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreVertical className="w-4 h-4" />
                      </button>
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
