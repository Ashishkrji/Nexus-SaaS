"use client";

import { motion } from 'framer-motion';
import { MapPin, Plus, Search, ExternalLink, RefreshCw, Star, MessageSquare, CheckCircle2 } from 'lucide-react';

const locations = [
  { id: 1, name: 'Nexus Tech - New York', address: '123 Tech Ave, NY', rating: 4.8, reviews: 128, status: 'Verified' },
  { id: 2, name: 'Nexus Tech - London', address: '45 Innovation Rd, London', rating: 4.9, reviews: 84, status: 'Verified' },
];

export default function GBPConnectPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">GBP Connect</h1>
          <p className="text-gray-500 mt-1">Connect and manage your Google Business Profiles.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
          <Plus className="w-5 h-5" />
          Connect Location
        </button>
      </div>

      <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-lg">
          <h2 className="text-2xl font-bold mb-2">Google Business Integration</h2>
          <p className="text-blue-100 mb-6">Connect your Google Business Profiles to automate posts, respond to reviews, and optimize your local SEO visibility using AI.</p>
          <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Sign in with Google
          </button>
        </div>
        <MapPin className="absolute right-[-20px] bottom-[-20px] w-64 h-64 text-blue-500/20 rotate-12" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((loc) => (
          <motion.div key={loc.id} whileHover={{ y: -4 }} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{loc.name}</h3>
                  <p className="text-sm text-gray-500">{loc.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-bold">
                <CheckCircle2 className="w-3 h-3" />
                {loc.status}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50 my-4">
              <div>
                <div className="flex items-center gap-1.5 text-orange-500 mb-1">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-bold">{loc.rating}</span>
                </div>
                <p className="text-xs text-gray-500">Average Rating</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-blue-600 mb-1">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm font-bold">{loc.reviews}</span>
                </div>
                <p className="text-xs text-gray-500">Total Reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex-1 px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center gap-2">
                <RefreshCw className="w-4 h-4" /> Sync Data
              </button>
              <button className="px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                View Profile
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
