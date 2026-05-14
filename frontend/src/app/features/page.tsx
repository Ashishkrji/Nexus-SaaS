"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Zap, Shield, Bot, Globe, BarChart3, Users, Layers, GitBranch, Lock, Cpu, Workflow, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function FeaturesPage() {
  const features = [
    { icon: Bot, title: 'Multi-Model AI Engine', desc: 'Route between GPT-4o, Claude 3.5, Gemini, Grok, and NVIDIA NIM with intelligent fallback. Auto-selects the best model for each task.', color: 'from-blue-500 to-blue-600' },
    { icon: Zap, title: 'Edge Deployments', desc: 'Deploy to 40+ global edge regions in under 2 seconds. Blue-green deployments with automated rollback on failure detection.', color: 'from-amber-500 to-orange-500' },
    { icon: Workflow, title: 'Visual Workflow Builder', desc: 'Drag-and-drop automation pipelines with conditional logic, webhooks, and scheduled triggers. No code required.', color: 'from-purple-500 to-purple-600' },
    { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Custom dashboards with live metrics, anomaly detection, and automated alerting. Export to CSV, JSON, or connect via API.', color: 'from-emerald-500 to-green-600' },
    { icon: Shield, title: 'Zero-Trust Security', desc: 'SOC 2 Type II certified. AES-256 encryption, MFA, SSO/SAML, IP allowlisting, and role-based access control.', color: 'from-red-500 to-rose-600' },
    { icon: Database, title: 'Managed Databases', desc: 'Provision PostgreSQL, MongoDB, or Redis instances with automatic backups, scaling, and cross-region replication.', color: 'from-cyan-500 to-cyan-600' },
    { icon: Users, title: 'Team Workspaces', desc: 'Shared environments with granular permissions, real-time collaboration, audit trails, and activity feeds.', color: 'from-pink-500 to-pink-600' },
    { icon: GitBranch, title: 'Git Integration', desc: 'Connect GitHub, GitLab, or Bitbucket. Auto-deploy on push, preview branches, and rollback to any commit.', color: 'from-gray-600 to-gray-700' },
    { icon: Globe, title: 'CDN & Caching', desc: 'Intelligent edge caching with cache invalidation API. Serve assets from the nearest PoP to your users globally.', color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Platform Features" title="Built for Teams That " titleAccent="Move Fast" description="Every feature is designed to reduce complexity, accelerate development cycles, and give your team superpowers." />

        {/* Features Grid */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.06 }}
                className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm card-hover relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${f.color} opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.08] group-hover:scale-150 transition-all duration-500`} />
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                  <f.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Highlight Section */}
        <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-900/40 border border-blue-700/30 rounded-full text-blue-300 text-sm font-semibold mb-6">
                  <Cpu className="w-4 h-4" /> AI-Powered Infrastructure
                </motion.div>
                <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  Intelligent Model Routing That <span className="text-blue-400">Just Works</span>
                </motion.h2>
                <motion.p variants={fadeUp} className="text-gray-400 leading-relaxed mb-8">
                  Our AI router automatically selects the best model for each request based on complexity, cost, and latency requirements. If a premium provider fails, the system seamlessly falls back to the next available model — zero downtime, zero data loss.
                </motion.p>
                <motion.div variants={fadeUp} className="space-y-4">
                  {['GPT-4o, Claude, Gemini, Grok, Llama 3.1', 'Automatic fallback chain with <100ms switchover', 'Per-request usage tracking and cost monitoring', 'Encrypted API key storage (AES-256)'].map(t => (
                    <div key={t} className="flex items-center gap-3 text-sm text-gray-300">
                      <div className="w-5 h-5 rounded-full bg-blue-600/30 flex items-center justify-center flex-shrink-0"><Zap className="w-3 h-3 text-blue-400" /></div>
                      {t}
                    </div>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4"><span className="w-3 h-3 rounded-full bg-red-500" /><span className="w-3 h-3 rounded-full bg-yellow-500" /><span className="w-3 h-3 rounded-full bg-green-500" /></div>
                <pre className="text-gray-300 overflow-x-auto"><code>{`POST /api/ai/complete
{
  "prompt": "Analyze this dataset...",
  "provider": "auto",
  "model": "best"
}

// Response
{
  "result": "Based on the analysis...",
  "provider": "anthropic",
  "model": "claude-3-5-sonnet",
  "latency": "1.2s",
  "tokens": 847
}`}</code></pre>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-5">Ready to Experience the Full Platform?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Start with our free tier — no credit card required. Upgrade anytime as your team grows.</p>
          <Link href="/signup" className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5 transition-all">
            Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
