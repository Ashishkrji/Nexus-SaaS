"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Zap, LayoutDashboard, Users, FolderKanban, Globe, BarChart3, Settings, Bell, Search, ChevronRight, LogOut, Shield, FileText, MapPin, MessageSquare, Sparkles } from 'lucide-react';
import { useAuth } from '@/lib/hooks';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { icon: Users, label: 'Team', href: '/dashboard/team' },
  { icon: Globe, label: 'Domains', href: '/dashboard/domains' },
  { icon: MapPin, label: 'GBP Connect', href: '/dashboard/gbp', group: 'Google Business' },
  { icon: FileText, label: 'GBP Posts', href: '/dashboard/gbp/posts', group: 'Google Business' },
  { icon: MessageSquare, label: 'GBP Reviews', href: '/dashboard/gbp/reviews', group: 'Google Business' },
  { icon: Sparkles, label: 'GBP Optimize', href: '/dashboard/gbp/optimize', group: 'Google Business' },
  { icon: BarChart3, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: FileText, label: 'Logs', href: '/dashboard/logs' },
  { icon: Shield, label: 'Security', href: '/dashboard/security' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, userName, userEmail, userInitial, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (path: string) => router.push(path);

  const handleSignOut = async () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading || !user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex items-center gap-3"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /><span className="text-gray-600">Loading...</span></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-900 text-white flex flex-col transition-all duration-300 flex-shrink-0 fixed h-full z-40`}>
        <div className="p-4 flex items-center gap-3 border-b border-gray-800">
          <Link href="/" className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-white" />
          </Link>
          {sidebarOpen && <Link href="/" className="text-lg font-extrabold tracking-tight">Nexus<span className="text-blue-400">SaaS</span></Link>}
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            const showGroup = link.group && (idx === 0 || sidebarLinks[idx - 1]?.group !== link.group);
            return (
              <div key={link.label}>
                {showGroup && sidebarOpen && <p className="px-3 pt-4 pb-1 text-[10px] font-bold text-gray-500 uppercase tracking-wider">{link.group}</p>}
                <Link href={link.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}>
                  <link.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span>{link.label}</span>}
                </Link>
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <ChevronRight className={`w-4 h-4 transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm w-64 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-500" />
            </button>
            <div className="h-8 w-px bg-gray-200" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold">{userInitial}</div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-gray-900">{userName}</p>
                <p className="text-xs text-gray-500">{userEmail}</p>
              </div>
              <button onClick={handleSignOut} className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors" title="Sign out">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}