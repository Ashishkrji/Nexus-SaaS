"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, CreditCard, Puzzle, Shield, Bell, CheckCircle2, MapPin, Zap, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '@/lib/hooks';

export default function SettingsPage() {
  const { userName, userEmail } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'integrations'>('profile');

  // GBP Simulation State
  const [gbpConnected, setGbpConnected] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectClick = () => setShowAuthModal(true);
  const handleAuthorize = () => {
    setShowAuthModal(false);
    setIsConnecting(true);
    setTimeout(() => {
      setIsConnecting(false);
      setGbpConnected(true);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Google OAuth Modal for Integrations */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="p-6 text-center border-b border-gray-100">
              <svg className="w-8 h-8 mx-auto mb-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              <h3 className="text-xl font-medium text-gray-900">Sign in with Google</h3>
              <p className="text-sm text-gray-500 mt-2">to continue to <strong>NexusSaaS</strong></p>
            </div>
            <div className="p-6 bg-gray-50/50">
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-900 mb-3">NexusSaaS wants to access your Google Account</p>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">See, edit, create, and delete your Google Business listings and posts.</span>
                  </label>
                  <label className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                    <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                    <span className="text-sm text-gray-700">View and respond to customer reviews for your business locations.</span>
                  </label>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                Make sure you trust NexusSaaS. You may be sharing sensitive info with this site or app. You can always see or remove access in your Google Account.
              </p>
              <div className="flex items-center justify-end gap-3">
                <button onClick={() => setShowAuthModal(false)} className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-xl transition-colors">Cancel</button>
                <button onClick={handleAuthorize} className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-sm">Continue</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences, billing, and integrations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-row md:flex-col gap-2 overflow-x-auto">
            <button onClick={() => setActiveTab('profile')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <User className="w-5 h-5" /> Account Profile
            </button>
            <button onClick={() => setActiveTab('billing')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'billing' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <CreditCard className="w-5 h-5" /> Plan & Billing
            </button>
            <button onClick={() => setActiveTab('integrations')} className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'integrations' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}>
              <Puzzle className="w-5 h-5" /> Integrations
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Personal Information</h2>
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input type="text" defaultValue={userName || 'Demo User'} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" defaultValue={userEmail || 'demo@nexussaas.com'} disabled className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>Coordinated Universal Time (UTC)</option>
                    <option>Indian Standard Time (IST)</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors">Save Changes</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* BILLING & PLAN TAB */}
          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-200 pb-4">Plan & Usage-Based Billing</h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none"><Zap className="w-32 h-32 text-blue-600" /></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full uppercase tracking-wider">Current Plan</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-gray-900">Free Tier</h3>
                    <p className="text-gray-500 mt-2 max-w-sm">You are on the basic plan. Upgrade to unlock more workspaces, global edge deployment, and full API access.</p>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <a href="/checkout/pro" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-600/20">
                      Upgrade to Pro
                    </a>
                    <a href="/checkout/business" className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white text-center text-sm font-bold rounded-xl transition-colors">
                      Upgrade to Business
                    </a>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-gray-500" /> Pay-As-You-Go Usage</h4>
                  <p className="text-sm text-gray-500 mb-6 leading-relaxed">If you exceed your plan's included limits, you will be billed for overages at standard pay-as-you-go rates automatically.</p>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="font-semibold text-gray-700">API Requests</span><span className="text-gray-500">0 / 500 (Free)</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }}></div></div>
                      <p className="text-xs text-gray-400 mt-1.5">$0.001 per extra request</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5"><span className="font-semibold text-gray-700">Bandwidth</span><span className="text-gray-500">0 GB / 10 GB</span></div>
                      <div className="w-full bg-gray-100 rounded-full h-2"><div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div></div>
                      <p className="text-xs text-gray-400 mt-1.5">$0.10 per extra GB</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                  <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-gray-500" /> Payment Methods</h4>
                  <div className="flex flex-col h-[calc(100%-2rem)] justify-center items-center text-center">
                    <p className="text-sm text-gray-500 mb-4">No payment methods found. Add a credit card to enable automatic overage billing or to upgrade your plan.</p>
                    <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold rounded-xl transition-colors">Add Payment Method</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* INTEGRATIONS TAB */}
          {activeTab === 'integrations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Connected Integrations</h2>
              <p className="text-gray-500 text-sm mb-8">Connect third-party apps to enhance NexusSaaS capabilities.</p>

              <div className="space-y-4">
                {/* Google Business Profile Connect */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Google Business Profile</h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">Automate responses to reviews and manage your locations directly from the dashboard.</p>
                    </div>
                  </div>
                  <div>
                    {gbpConnected ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-700 text-sm font-bold rounded-lg border border-green-200">
                        <CheckCircle2 className="w-4 h-4" /> Connected
                      </span>
                    ) : (
                      <button 
                        onClick={handleConnectClick}
                        disabled={isConnecting}
                        className="px-5 py-2.5 bg-white border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 text-sm font-bold rounded-xl transition-colors disabled:opacity-50"
                      >
                        {isConnecting ? 'Connecting...' : 'Connect Google'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Slack (Dummy) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors opacity-60">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="font-extrabold text-gray-800">#</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Slack Notifications</h3>
                      <p className="text-sm text-gray-500 mt-1 max-w-md leading-relaxed">Get deployment alerts and error logs sent directly to your Slack channels.</p>
                    </div>
                  </div>
                  <button className="px-5 py-2.5 bg-gray-100 text-gray-500 text-sm font-bold rounded-xl cursor-not-allowed">
                    Coming Soon
                  </button>
                </div>

              </div>
            </motion.div>
          )}

        </main>
      </div>
    </div>
  );
}
