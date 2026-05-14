"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Search, ShieldCheck, Server, AlertCircle, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { useAuth, useApi } from '@/lib/hooks';

export default function DomainsPage() {
  const { token } = useAuth();
  const { data: domains, loading, error } = useApi('/api/domains', token);
  const [search, setSearch] = useState('');

  if (loading) return <div className="p-12 text-center font-bold text-gray-500">Loading domains...</div>;
  if (error) return <div className="p-12 text-center text-red-500 font-bold">Error: {error}</div>;

  const displayDomains = domains || [];
  const filteredDomains = displayDomains.filter((d: any) => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 font-sans">Domains</h1>
          <p className="text-gray-500 mt-1">Manage your custom domains and SSL certificates.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
          <Plus className="w-5 h-5" />
          Add Domain
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter domains..."
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
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Domain</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">SSL Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">DNS</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Provider</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredDomains.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-500">No domains found. Connect your first domain to get started.</td></tr>
              ) : (
                filteredDomains.map((domain: any) => (
                  <motion.tr key={domain._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${domain.status === 'HEALTHY' ? 'bg-green-50' : 'bg-red-50'}`}>
                          <Globe className={`w-4 h-4 ${domain.status === 'HEALTHY' ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{domain.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className={`w-4 h-4 ${domain.sslStatus === 'VALID' ? 'text-green-500' : 'text-orange-500'}`} />
                        <span className="text-sm text-gray-600">{domain.sslStatus}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {domain.dnsStatus === 'VERIFIED' ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className="text-sm text-gray-600">{domain.dnsStatus}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                        <Server className="w-4 h-4 text-gray-400" />
                        {domain.provider}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreHorizontal className="w-4 h-4" />
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
