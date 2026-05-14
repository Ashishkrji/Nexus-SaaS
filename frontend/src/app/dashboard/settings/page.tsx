"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, CreditCard, Palette, Globe, Save, Sliders, CheckCircle2 } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Settings</h1>
          <p className="text-gray-500 mt-1">Manage your account preferences and global settings.</p>
        </div>
        <button 
          onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'}`}
        >
          {saved ? <><CheckCircle2 className="w-5 h-5" /> Saved</> : <><Save className="w-5 h-5" /> Save Changes</>}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 space-y-8">
          {activeTab === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
                <User className="w-5 h-5 text-blue-600" /> Public Profile
              </h3>
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-2xl font-black shadow-xl shadow-blue-600/20">AK</div>
                <div>
                  <button className="px-4 py-2 bg-blue-50 text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-100 transition-all">Upload New Photo</button>
                  <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Full Name</label>
                  <input type="text" defaultValue="Alok Kumar" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Display Name</label>
                  <input type="text" defaultValue="alokkumar" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50" />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Bio</label>
                  <textarea defaultValue="Building the future of local SEO with AI." className="w-full h-32 px-4 py-2.5 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50/50 resize-none" />
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
                <Bell className="w-5 h-5 text-blue-600" /> Notification Preferences
              </h3>
              <div className="space-y-6">
                {[
                  { title: 'Deployment Status', desc: 'Notify me when a project build completes or fails.', default: true },
                  { title: 'New Reviews', desc: 'Alert me when a customer leaves a new Google Business review.', default: true },
                  { title: 'Weekly Reports', desc: 'Send a summary of my analytics performance every Monday.', default: false },
                  { title: 'Security Alerts', desc: 'Immediate notification on new logins or security changes.', default: true },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-100 rounded-full relative cursor-pointer">
                      <div className={`absolute top-1 w-4 h-4 rounded-full transition-all ${item.default ? 'right-1 bg-blue-600' : 'left-1 bg-gray-400'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
                <CreditCard className="w-5 h-5 text-blue-600" /> Plan & Billing
              </h3>
              <div className="p-6 bg-blue-600 rounded-2xl text-white flex items-center justify-between shadow-xl shadow-blue-600/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-blue-100">Current Plan</p>
                  <p className="text-2xl font-black mt-1">Enterprise Pro</p>
                  <p className="text-xs text-blue-100 mt-4">Next billing date: June 01, 2024 ($99.00)</p>
                </div>
                <button className="px-6 py-2.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">Upgrade Plan</button>
              </div>
              <div className="space-y-4 pt-4">
                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Payment Method</h4>
                <div className="p-4 border border-gray-100 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center font-bold text-xs">VISA</div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">•••• •••• •••• 4242</p>
                      <p className="text-xs text-gray-500">Expires 12/26</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">Edit</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'appearance' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-8">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 pb-4 border-b border-gray-50">
                <Palette className="w-5 h-5 text-blue-600" /> Interface Customization
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {['Light', 'Dark', 'System'].map((mode) => (
                  <button key={mode} className={`p-4 rounded-2xl border transition-all text-left ${mode === 'Light' ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <div className={`w-full h-16 rounded-lg mb-3 ${mode === 'Dark' ? 'bg-gray-900' : mode === 'Light' ? 'bg-white' : 'bg-gradient-to-br from-white to-gray-900'} border border-gray-100`} />
                    <p className="text-sm font-bold text-gray-900">{mode} Mode</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
