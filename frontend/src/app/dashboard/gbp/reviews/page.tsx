"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Search, Filter, Sparkles, User, Reply, MoreHorizontal } from 'lucide-react';
import { useAuth, useApi } from '@/lib/hooks';

export default function GBPReviewsPage() {
  const { token } = useAuth();
  const { data: reviews, loading, error } = useApi('/api/reviews', token);

  if (loading) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /><span className="text-gray-600 font-bold">Loading reviews...</span></div>
    </div>
  );

  if (error) return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="p-6 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-bold">Error: {error}</div>
    </div>
  );

  const displayReviews = reviews || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">GBP Reviews</h1>
          <p className="text-gray-500 mt-1">Monitor and respond to your Google Business reviews.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-50 text-blue-600 font-semibold rounded-xl hover:bg-blue-100 transition-all">
            <Sparkles className="w-5 h-5" />
            AI Auto-Reply Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Average Rating</p>
            <p className="text-3xl font-extrabold text-gray-900">4.8</p>
            <div className="flex items-center gap-1 mt-2 text-orange-400">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
            </div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center">
            <Star className="w-7 h-7 text-orange-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Reviews</p>
            <p className="text-3xl font-extrabold text-gray-900">{displayReviews.length}</p>
            <p className="text-sm text-green-600 font-medium mt-1">Syncing Live</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
            <MessageSquare className="w-7 h-7 text-blue-500" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Reply Rate</p>
            <p className="text-3xl font-extrabold text-gray-900">
              {displayReviews.length > 0 ? Math.round((displayReviews.filter((r: any) => r.replyText).length / displayReviews.length) * 100) : 0}%
            </p>
            <p className="text-sm text-gray-500 mt-1">Real-time status</p>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
            <Reply className="w-7 h-7 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search reviews..." className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 text-sm w-full outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {displayReviews.length === 0 ? (
            <div className="p-20 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <MessageSquare className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-900 font-bold">No reviews found in database</p>
              <p className="text-sm text-gray-500 mt-1 max-w-xs">Connect your Google Business Profile to sync your customer reviews and start responding.</p>
              <button className="mt-6 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20">Connect GBP Now</button>
            </div>
          ) : (
            displayReviews.map((review: any) => (
              <div key={review._id} className="p-6 hover:bg-gray-50/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      {review.authorPhoto ? <img src={review.authorPhoto} alt="" className="w-full h-full rounded-full" /> : <User className="w-5 h-5 text-gray-400" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{review.authorName || 'Anonymous'}</h4>
                      <div className="flex items-center gap-1 text-orange-400">
                        {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`} />)}
                        <span className="text-xs text-gray-400 ml-2 font-medium">{new Date(review.postedAt || Date.now()).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600"><MoreHorizontal className="w-5 h-5" /></button>
                </div>
                <p className="text-sm text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                
                {review.replyText ? (
                  <div className="ml-6 p-4 bg-gray-50 rounded-2xl border border-gray-100 relative">
                    <div className="absolute left-[-15px] top-4 w-4 h-px bg-gray-200" />
                    <p className="text-xs font-bold text-gray-900 mb-1 flex items-center gap-1.5">
                      <Reply className="w-3 h-3 text-blue-500" /> Your Response
                    </p>
                    <p className="text-sm text-gray-600">{review.replyText}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 ml-6">
                    <button className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <Reply className="w-4 h-4" /> Reply
                    </button>
                    <button className="px-4 py-2 text-sm font-bold text-blue-600 border border-blue-100 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2">
                      <Sparkles className="w-4 h-4" /> Generate AI Reply
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
