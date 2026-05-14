"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Smartphone, Laptop, Lock, Eye, EyeOff, Plus, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';

const apiKeys = [
  { id: 1, name: 'Production API Key', key: 'nx_live_xxxxxxxxxxxxxxxxxxxx24a1', created: '2024-04-15' },
  { id: 2, name: 'Staging API Key', key: 'nx_test_xxxxxxxxxxxxxxxxxxxx88b2', created: '2024-05-01' },
];

const sessions = [
  { id: 1, device: 'Windows PC · Chrome', location: 'New Delhi, India', current: true, date: 'Active now' },
  { id: 2, device: 'iPhone 15 · Safari', location: 'New Delhi, India', current: false, date: 'Yesterday, 10:20 AM' },
];

export default function SecurityPage() {
  const [showKeys, setShowKeys] = useState<number[]>([]);

  const toggleKey = (id: number) => {
    setShowKeys(prev => prev.includes(id) ? prev.filter(k => k !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Security Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account security, API keys, and active sessions.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Two-Factor Authentication</h3>
                <p className="text-xs text-gray-500">Add an extra layer of security to your account.</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Authenticator App</p>
                  <p className="text-xs text-gray-500">Configured via Google Authenticator</p>
                </div>
              </div>
              <button className="text-xs font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Disable</button>
            </div>
            <button className="w-full py-2.5 border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
              Setup Backup Method
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                <Lock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Change Password</h3>
                <p className="text-xs text-gray-500">Update your account password regularly.</p>
              </div>
            </div>
            <form className="space-y-4">
              <input type="password" placeholder="Current Password" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <input type="password" placeholder="New Password" className="w-full px-4 py-2.5 rounded-xl border border-gray-100 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
              <button className="w-full py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-black transition-colors shadow-lg">
                Update Password
              </button>
            </form>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                  <Key className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-gray-900">API Access Keys</h3>
                  <p className="text-xs text-gray-500">Keys to access our API endpoints.</p>
                </div>
              </div>
              <button className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              {apiKeys.map((k) => (
                <div key={k.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-gray-900">{k.name}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleKey(k.id)} className="p-1.5 text-gray-400 hover:text-gray-600"><Eye className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="bg-white px-3 py-2 rounded-lg border border-gray-100 flex items-center justify-between">
                    <code className="text-[10px] text-gray-600 font-mono">{showKeys.includes(k.id) ? k.key : '••••••••••••••••••••••••••••••••'}</code>
                    <button className="p-1 hover:bg-gray-50 rounded"><RefreshCw className="w-3 h-3 text-gray-400" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <Laptop className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Active Sessions</h3>
                <p className="text-xs text-gray-500">Devices currently logged into your account.</p>
              </div>
            </div>
            <div className="space-y-4">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                      {s.device.includes('iPhone') ? <Smartphone className="w-4 h-4" /> : <Laptop className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{s.device} {s.current && <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded ml-1 uppercase">Current</span>}</p>
                      <p className="text-xs text-gray-500">{s.location} · {s.date}</p>
                    </div>
                  </div>
                  {!s.current && <button className="text-xs font-bold text-gray-400 hover:text-red-600">Revoke</button>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-6">
        <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <div className="flex-1">
          <h4 className="text-base font-bold text-red-900">Delete Account</h4>
          <p className="text-sm text-red-700">Permanently remove your account and all associated data. This action is irreversible.</p>
        </div>
        <button className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
          Delete Now
        </button>
      </div>
    </div>
  );
}
