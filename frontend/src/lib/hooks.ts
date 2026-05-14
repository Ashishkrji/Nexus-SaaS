import { useState, useEffect, useCallback } from 'react';

// ========================
// AUTH HOOK
// ========================
export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    const savedToken = localStorage.getItem('nexus_token');
    
    if (savedUser && savedToken && savedUser !== 'undefined') {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch (err) {
        console.error('Failed to parse user from localStorage', err);
        localStorage.removeItem('nexus_user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: any, userToken: string) => {
    localStorage.setItem('nexus_user', JSON.stringify(userData));
    localStorage.setItem('nexus_token', userToken);
    setUser(userData);
    setToken(userToken);
  };

  const logout = () => {
    localStorage.removeItem('nexus_user');
    localStorage.removeItem('nexus_token');
    setUser(null);
    setToken('');
  };

  const userName = user?.name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';
  const userInitial = (userName[0] || 'U').toUpperCase();

  return { user, token, loading, userName, userEmail, userInitial, login, logout };
}

// ========================
// GENERIC API HOOK
// ========================
export function useApi(url: string, token: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [url, token]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const post = async (body: any) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to create');
    const json = await res.json();
    await fetchData();
    return json;
  };

  const patch = async (body: any) => {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Failed to update');
    const json = await res.json();
    await fetchData();
    return json;
  };

  const remove = async (id: number) => {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    if (!res.ok) throw new Error('Failed to delete');
    await fetchData();
  };

  return { data, loading, error, refetch: fetchData, post, patch, remove };
}

// ========================
// AI SETTINGS HOOK
// ========================
export function useAISettings(token: string) {
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSettings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/settings', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch settings');
      const data = await res.json();
      setSettings(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const updateSettings = async (updates: any) => {
    const res = await fetch('/api/ai/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(updates),
    });
    if (!res.ok) throw new Error('Failed to update settings');
    const data = await res.json();
    await fetchSettings();
    return data;
  };

  return { settings, loading, error, updateSettings, refetch: fetchSettings };
}

// ========================
// AI COMPLETION HOOK
// ========================
export function useAIComplete(token: string) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState('');

  const complete = async (prompt: string, options?: { provider?: string; model?: string }) => {
    setLoading(true);
    setError('');
    setResult('');
    try {
      const res = await fetch('/api/ai/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ prompt, ...options }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'AI completion failed');
      setResult(data.result);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { complete, result, loading, error };
}

// ========================
// PLAN & USAGE HOOK
// ========================
export function usePlan(token: string) {
  const [plan, setPlan] = useState<string>('FREE');
  const [usage, setUsage] = useState<any>(null);
  const [features, setFeatures] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsage = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch('/api/ai/usage', { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error('Failed to fetch usage');
      const data = await res.json();
      setPlan(data.plan);
      setUsage(data.usage);
      setFeatures(data.features);
    } catch (err) {
      console.error('Usage fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { fetchUsage(); }, [fetchUsage]);

  const upgradePlan = async (newPlan: string) => {
    const res = await fetch('/api/ai/plan', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ plan: newPlan }),
    });
    if (!res.ok) throw new Error('Failed to upgrade plan');
    const data = await res.json();
    setPlan(data.plan);
    return data;
  };

  return { plan, usage, features, loading, upgradePlan, refetch: fetchUsage };
}

// ========================
// AI PROVIDERS HOOK
// ========================
export function useProviders(token: string) {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    fetch('/api/ai/providers', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => setProviders(data.providers || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  return { providers, loading };
}

// ========================
// ACTIVITY LOG HELPER
// ========================
export async function logActivity(token: string, action: string, resource: string, details: string, status = 'info') {
  try {
    await fetch('/api/activity-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ action, resource, details, status }),
    });
  } catch {}
}