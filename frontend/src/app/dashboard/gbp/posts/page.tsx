"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Sparkles, Calendar, Search, Filter, MoreVertical, Image as ImageIcon, MessageSquare } from 'lucide-react';

const posts = [
  { id: 1, title: 'Summer Sale Announcement', type: 'Offer', status: 'Published', date: '2024-05-01', location: 'New York' },
  { id: 2, title: 'New Tech Stack Update', type: 'What\'s New', status: 'Scheduled', date: '2024-05-10', location: 'All Locations' },
  { id: 3, title: 'Customer Success Story', type: 'What\'s New', status: 'Draft', date: '-', location: 'London' },
];

export default function GBPPostsPage() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">GBP Posts</h1>
          <p className="text-gray-500 mt-1">Schedule and manage your Google Business Profile posts.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
            <Sparkles className="w-5 h-5 text-purple-600" />
            AI Draft
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 transition-all">
            <Plus className="w-5 h-5" />
            Create Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-1 rounded-xl border border-gray-100 flex items-center gap-1 shadow-sm w-fit">
            {['all', 'published', 'scheduled', 'drafts'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition-all capitalize ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <motion.div key={post.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-5 hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-50 transition-colors">
                  <ImageIcon className="w-6 h-6 text-gray-400 group-hover:text-blue-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded bg-gray-100 text-gray-500`}>{post.type}</span>
                    <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded ${post.status === 'Published' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>{post.status}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 truncate">{post.title}</h3>
                  <p className="text-sm text-gray-500 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                    <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {post.location}</span>
                  </p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-purple-600/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">AI Post Generator</h3>
            </div>
            <p className="text-purple-100 text-sm mb-6">Describe your update and let our AI create the perfect Google Business post for you.</p>
            <textarea 
              placeholder="What are you announcing?"
              className="w-full h-32 bg-white/10 border border-white/20 rounded-xl p-4 text-sm placeholder:text-purple-200 outline-none focus:ring-2 focus:ring-white/50 mb-4 resize-none"
            />
            <button className="w-full py-3 bg-white text-purple-600 font-bold rounded-xl hover:bg-purple-50 transition-colors shadow-lg">
              Generate Draft
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Upcoming Schedule</h3>
            <div className="space-y-4">
              {[1, 2].map(i => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex flex-col items-center justify-center text-[10px] font-bold text-gray-400">
                    <span className="text-xs text-gray-900">MAY</span>
                    <span>1{i}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">Weekly Promotion</p>
                    <p className="text-xs text-gray-500">10:00 AM · All Locations</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
