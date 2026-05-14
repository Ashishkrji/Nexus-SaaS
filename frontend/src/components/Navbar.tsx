import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Zap, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../lib/hooks';

const productLinks = [
  { label: 'Product', href: '/product' },
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'API Docs', href: '/api-docs' },
  { label: 'Changelog', href: '/changelog' },
];

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Press', href: '/press' },
  { label: 'Contact', href: '/contact' },
];

const resourceLinks = [
  { label: 'Help Center', href: '/help-center' },
  { label: 'Community', href: '/community' },
  { label: 'Guides', href: '/guides' },
  { label: 'Webinars', href: '/webinars' },
  { label: 'Status', href: '/status' },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Security', href: '/security' },
  { label: 'GDPR', href: '/gdpr' },
  { label: 'DPA', href: '/dpa' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const { user, userName, userEmail, logout } = useAuth();
  const [userMenu, setUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = (path: string) => router.push(path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropdown(null); }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setDropdown(null);
      setUserMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const navBg = scrolled ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-gray-900/5' : 'bg-white/60 backdrop-blur-md';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg} border-b border-gray-100/50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/20"><Zap className="w-5 h-5 text-white" /></div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">Nexus<span className="text-blue-600">SaaS</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1" ref={dropdownRef}>
            {[
              { key: 'product', label: 'Product', links: productLinks },
              { key: 'company', label: 'Company', links: companyLinks },
              { key: 'resources', label: 'Resources', links: resourceLinks },
              { key: 'legal', label: 'Legal', links: legalLinks },
            ].map((group) => (
              <div key={group.key} className="relative">
                <button onClick={() => setDropdown(dropdown === group.key ? null : group.key)} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-all">
                  {group.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdown === group.key ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {dropdown === group.key && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.15 }} className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-900/10 border border-gray-100 py-2 z-50">
                      {group.links.map((link) => (
                        <Link key={link.href} href={link.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 transition-colors">{link.label}</Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <Link href="/pricing" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 rounded-lg hover:bg-blue-50/50 transition-all">Pricing</Link>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />Dashboard
                </Link>
                <div className="relative">
                  <button onClick={() => setUserMenu(!userMenu)} className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold">{(userName[0] || 'U').toUpperCase()}</div>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>
                  <AnimatePresence>
                    {userMenu && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-xs text-gray-500">Signed in as</p>
                          <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                        </div>
                        <Link href="/dashboard" onClick={() => setUserMenu(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                          <LayoutDashboard className="w-4 h-4" />Dashboard
                        </Link>
                        <button onClick={() => { logout(); setUserMenu(false); navigate('/'); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">Log In</Link>
                <Link href="/signup" className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all">Start Free Trial</Link>
              </>
            )}
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden">
            <div className="px-4 py-4 space-y-1 max-h-[70vh] overflow-y-auto">
              {[
                { label: 'Product', links: productLinks },
                { label: 'Company', links: companyLinks },
                { label: 'Resources', links: resourceLinks },
                { label: 'Legal', links: legalLinks },
              ].map((group) => (
                <div key={group.label}>
                  <p className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">{group.label}</p>
                  {group.links.map((l) => (
                    <Link key={l.href} href={l.href} className="block px-4 py-2.5 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl">{l.label}</Link>
                  ))}
                </div>
              ))}
              <Link href="/pricing" className="block px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl">Pricing</Link>
              <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
                {user ? (
                  <>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">Dashboard</Link>
                    <button onClick={() => { logout(); setMobileOpen(false); navigate('/'); }} className="w-full text-center px-5 py-3 text-sm font-semibold text-red-600 bg-red-50 rounded-xl">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="block text-center px-5 py-3 text-sm font-semibold text-gray-700 bg-gray-50 rounded-xl">Log In</Link>
                    <Link href="/signup" className="block text-center px-5 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">Start Free Trial</Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}