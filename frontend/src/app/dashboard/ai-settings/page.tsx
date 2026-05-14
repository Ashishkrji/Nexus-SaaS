"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bot, Key, Shield, Check, Lock, AlertTriangle, RefreshCw, Trash2, Zap, Crown, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProviderInfo {
  provider: string;
  models: { name: string; id: string; tier: string }[];
  available: boolean;
  requiresKey: boolean;
}

interface AISettings {
  defaultProvider: string;
  preferredModel: string;
  hasKey: Record<string, boolean>;
  autoReply: boolean;
  replyTone: string;
  language: string;
}

interface UsageData {
  plan: string;
  usage: {
    apiRequests: number;
    limit: number | string;
    percentage: number;
    lastReset: string;
  };
}

const PROVIDER_LABELS: Record<string, { name: string; icon: string; color: string; desc: string }> = {
  nvidia: { name: 'NVIDIA NIM', icon: '🟢', color: 'bg-green-50 border-green-200 text-green-700', desc: 'Free tier — Llama 3.1, Mistral, Mixtral models. No API key required.' },
  openai: { name: 'OpenAI', icon: '🤖', color: 'bg-emerald-50 border-emerald-200 text-emerald-700', desc: 'GPT-4o, GPT-4o Mini, GPT-4 Turbo. Premium models with best-in-class reasoning.' },
  anthropic: { name: 'Anthropic', icon: '🧠', color: 'bg-purple-50 border-purple-200 text-purple-700', desc: 'Claude 4 Sonnet, Claude 3.5 Sonnet, Claude 3 Haiku. Safe, helpful AI models.' },
  gemini: { name: 'Google Gemini', icon: '💎', color: 'bg-blue-50 border-blue-200 text-blue-700', desc: 'Gemini 2.5 Flash, Gemini 2.0 Flash, Gemini 1.5 Pro. Google multimodal AI.' },
  grok: { name: 'xAI Grok', icon: '⚡', color: 'bg-orange-50 border-orange-200 text-orange-700', desc: 'Grok 2, Grok 2 Mini. Real-time knowledge with witty, conversational style.' },
};

export default function AISettingsPage() {
  const { user, token, loading: authLoading } = useAuth();
  const router = useRouter();
  const [providers, setProviders] = useState<ProviderInfo[]>([]);
  const [settings, setSettings] = useState<AISettings | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('nvidia');
  const [newKey, setNewKey] = useState('');
  const [keyProvider, setKeyProvider] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!token) return;
    Promise.all([
      fetch('/api/ai/providers', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/ai/settings', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
      fetch('/api/ai/usage', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.json()),
    ]).then(([provData, settData, usageData]) => {
      setProviders(provData.providers || []);
      setSettings(settData);
      setUsage(usageData);
      setSelectedProvider(settData.defaultProvider || 'nvidia');
      setLoading(false);
    }).catch(err => {
      console.error('Failed to load AI settings:', err);
      setLoading(false);
    });
  }, [token]);

  const saveProvider = async () => {
    setSaving(true);
    try {
      await fetch('/api/ai/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ defaultProvider: selectedProvider }),
      });
      setMessage({ text: `Default provider set to ${PROVIDER_LABELS[selectedProvider]?.name}`, type: 'success' });
      if (settings) setSettings({ ...settings, defaultProvider: selectedProvider });
    } catch { setMessage({ text: 'Failed to update', type: 'error' }); }
    setSaving(false);
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const saveKey = async () => {
    if (!newKey.trim() || !keyProvider) return;
    setSaving(true);
    try {
      await fetch('/api/ai/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ apiKeys: { [keyProvider]: newKey.trim() } }),
      });
      setMessage({ text: `${PROVIDER_LABELS[keyProvider]?.name} API key saved & encrypted`, type: 'success' });
      setNewKey('');
      setKeyProvider('');
      if (settings) setSettings({ ...settings, hasKey: { ...settings.hasKey, [keyProvider]: true } });
    } catch { setMessage({ text: 'Failed to save key', type: 'error' }); }
    setSaving(false);
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  const removeKey = async (provider: string) => {
    try {
      await fetch(`/api/ai/settings/key/${provider}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: `${PROVIDER_LABELS[provider]?.name} key removed`, type: 'success' });
      if (settings) setSettings({ ...settings, hasKey: { ...settings.hasKey, [provider]: false } });
    } catch { setMessage({ text: 'Failed to remove key', type: 'error' }); }
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-24 pb-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              <Bot className="w-8 h-8 text-blue-600" /> AI Provider Settings
            </h1>
            <p className="text-gray-500 mt-1">Configure AI models, API keys, and usage limits for your workspace.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider ${
              usage?.plan === 'AGENCY' ? 'bg-purple-100 text-purple-700' :
              usage?.plan === 'BUSINESS' ? 'bg-blue-100 text-blue-700' :
              usage?.plan === 'PRO' ? 'bg-green-100 text-green-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              <Crown className="w-3.5 h-3.5 inline mr-1" /> {usage?.plan || 'FREE'} Plan
            </span>
          </div>
        </div>

        {/* Status Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-medium flex items-center gap-2 ${
            message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
          }`}>
            {message.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            {message.text}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column — Usage & Plan */}
          <div className="space-y-6">
            {/* Usage Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" /> API Usage This Month
              </h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-500">{usage?.usage.apiRequests || 0} requests</span>
                  <span className="font-bold text-gray-900">{usage?.usage.limit || 500}</span>
                </div>
                <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      (usage?.usage.percentage || 0) > 80 ? 'bg-red-500' : (usage?.usage.percentage || 0) > 50 ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${Math.min(usage?.usage.percentage || 0, 100)}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-400">Resets monthly. Last reset: {usage?.usage.lastReset ? new Date(usage.usage.lastReset).toLocaleDateString() : 'N/A'}</p>
            </div>

            {/* Plan Upgrade */}
            {usage?.plan === 'FREE' && (
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl text-white shadow-xl">
                <Sparkles className="w-6 h-6 mb-3" />
                <h3 className="font-bold text-lg mb-2">Unlock All AI Providers</h3>
                <p className="text-blue-100 text-sm mb-4">Upgrade to Pro for 25,000 API requests/mo and access to OpenAI, Claude, Gemini, and Grok models.</p>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-blue-700 font-bold rounded-xl text-sm hover:bg-blue-50 transition-colors">
                  View Plans <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}

            {/* Key Status */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-600" /> API Key Status
              </h3>
              <div className="space-y-3">
                {Object.entries(PROVIDER_LABELS).map(([key, info]) => (
                  <div key={key} className="flex items-center justify-between py-2">
                    <span className="text-sm text-gray-700 font-medium flex items-center gap-2">
                      <span>{info.icon}</span> {info.name}
                    </span>
                    {key === 'nvidia' ? (
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Built-in</span>
                    ) : settings?.hasKey[key] ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1"><Shield className="w-3 h-3" /> Encrypted</span>
                        <button onClick={() => removeKey(key)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Not set</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column — Provider Selection & Key Management */}
          <div className="lg:col-span-2 space-y-6">
            {/* Provider Selection */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-6">Select Default AI Provider</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {providers.map((p) => {
                  const info = PROVIDER_LABELS[p.provider];
                  const isSelected = selectedProvider === p.provider;
                  const isLocked = !p.available;
                  return (
                    <button
                      key={p.provider}
                      onClick={() => !isLocked && setSelectedProvider(p.provider)}
                      disabled={isLocked}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                        isSelected ? 'border-blue-500 bg-blue-50/50 shadow-md' :
                        isLocked ? 'border-gray-100 bg-gray-50/50 opacity-60 cursor-not-allowed' :
                        'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                      }`}
                    >
                      {isLocked && (
                        <div className="absolute top-3 right-3">
                          <Lock className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      {isSelected && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div className="text-xl mb-2">{info?.icon}</div>
                      <h4 className="font-bold text-gray-900 mb-1">{info?.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{info?.desc}</p>
                      {p.models.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {p.models.slice(0, 3).map((m) => (
                            <span key={m.id} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{m.name}</span>
                          ))}
                          {p.models.length > 3 && <span className="text-[10px] text-gray-400">+{p.models.length - 3} more</span>}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={saveProvider}
                disabled={saving || selectedProvider === settings?.defaultProvider}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                Save Default Provider
              </button>
            </div>

            {/* Add API Key */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 text-lg mb-2">Add API Key</h3>
              <p className="text-gray-500 text-sm mb-6">Your keys are encrypted with AES-256 before storage. We never log or expose your raw API keys.</p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                  <select
                    value={keyProvider}
                    onChange={(e) => setKeyProvider(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select provider...</option>
                    {['openai', 'anthropic', 'gemini', 'grok'].map((p) => (
                      <option key={p} value={p}>{PROVIDER_LABELS[p]?.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Key</label>
                  <input
                    type="password"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    placeholder="sk-... or your API key"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono"
                  />
                </div>
                <button
                  onClick={saveKey}
                  disabled={saving || !newKey.trim() || !keyProvider}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" /> Encrypt & Save Key
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
