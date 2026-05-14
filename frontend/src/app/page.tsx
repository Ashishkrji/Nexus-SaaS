"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, MessageSquare, BarChart3, Shield, Zap, Globe, Users, Check, Sparkles, Play, ChevronRight, Bot, Layers, GitBranch } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Home() {

  const testimonials = [
    { name: 'Sarah Chen', role: 'CTO, ScaleFlow', quote: 'NexusSaaS cut our deployment time from 45 minutes to under 90 seconds. The AI-powered workflow automation alone saved our team 200+ hours per quarter.', rating: 5 },
    { name: 'Marcus Johnson', role: 'VP Engineering, DataPulse', quote: 'We evaluated 12 platforms before choosing NexusSaaS. The multi-model AI router and 99.99% uptime SLA were the deciding factors for our enterprise clients.', rating: 5 },
    { name: 'Priya Sharma', role: 'Founder, CloudNine Labs', quote: 'From prototype to production in 3 weeks. The integrations ecosystem and real-time analytics dashboard gave us visibility we never had before.', rating: 5 },
    { name: 'Alex Rivera', role: 'DevOps Lead, FinStack', quote: 'The free NVIDIA NIM tier let us experiment with AI features at zero cost. When we scaled to Pro, the transition was completely seamless.', rating: 5 },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Deployments', desc: 'Sub-second deployments with edge-optimized infrastructure across 40+ global regions. Zero-downtime rolling updates.', color: 'from-blue-500 to-blue-600' },
    { icon: Shield, title: 'Enterprise Security', desc: 'SOC 2 Type II certified. End-to-end AES-256 encryption, SSO/SAML, and automated compliance reporting.', color: 'from-purple-500 to-purple-600' },
    { icon: Bot, title: 'AI-Powered Workflows', desc: '5 AI providers (GPT-4o, Claude, Gemini, Grok, Llama) with intelligent fallback routing and usage tracking.', color: 'from-emerald-500 to-emerald-600' },
    { icon: Globe, title: 'Global Edge Network', desc: 'Auto-scaling from zero to millions. Sub-50ms latency in 100+ countries with intelligent traffic routing.', color: 'from-orange-500 to-orange-600' },
    { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Deep insights into performance, usage patterns, and business KPIs with customizable dashboards.', color: 'from-cyan-500 to-cyan-600' },
    { icon: Users, title: 'Team Collaboration', desc: 'Role-based access, shared workspaces, audit logs, and real-time sync across unlimited team members.', color: 'from-pink-500 to-pink-600' },
  ];

  const stats = [
    { value: '12,000+', label: 'Teams Worldwide' },
    { value: '99.99%', label: 'Uptime SLA' },
    { value: '40+', label: 'Global Regions' },
    { value: '<50ms', label: 'Avg Latency' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* ===== HERO ===== */}
        <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
          <div className="absolute inset-0 mesh-gradient" />
          <div className="absolute inset-0 dot-pattern opacity-[0.02]" />
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl animate-blob" />
          <div className="absolute bottom-20 left-[5%] w-[400px] h-[400px] bg-indigo-400/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
                <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-8">
                  <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" /> Now with 5 AI Providers
                </motion.div>
                <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.08] tracking-tight">
                  Build, Ship & Scale{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent">with Confidence</span>
                </motion.h1>
                <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-xl">
                  The all-in-one cloud platform with AI-powered automation, real-time analytics, and enterprise security. From prototype to planet-scale.
                </motion.p>
                <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Link href="/signup" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-300 hover:-translate-y-0.5">
                    Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/product" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
                    <Play className="w-4 h-4" /> Watch Demo
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp} className="mt-12 flex items-center gap-6">
                  <div className="flex -space-x-3">{[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">{String.fromCharCode(64+i)}</div>
                  ))}</div>
                  <div>
                    <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                    <p className="text-sm text-gray-500 mt-0.5 font-medium">Trusted by 12,000+ teams worldwide</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Dashboard Preview */}
              <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative">
                <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100/80 p-5 sm:p-7 tilt-card">
                  <div className="flex items-center justify-between mb-5">
                    <div><h3 className="font-bold text-gray-900">Dashboard</h3><p className="text-sm text-gray-500">Real-time overview</p></div>
                    <div className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-lg flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />Live</div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { icon: Users, label: 'Active Users', value: '24.8K', change: '+12%', color: 'text-blue-500' },
                      { icon: TrendingUp, label: 'Revenue', value: '$1.2M', change: '+23%', color: 'text-green-500' },
                      { icon: Zap, label: 'Uptime', value: '99.99%', change: 'Stable', color: 'text-purple-500' },
                    ].map(s => (
                      <div key={s.label} className="bg-gray-50 rounded-2xl p-3 sm:p-4 hover:bg-blue-50/50 transition-colors">
                        <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</p>
                        <p className="text-xs text-gray-500">{s.label}</p>
                        <p className="text-xs text-green-600 font-semibold mt-1">↑ {s.change}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-3"><p className="text-sm font-semibold text-gray-700">Growth Trend</p><BarChart3 className="w-4 h-4 text-gray-400" /></div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[35,52,45,68,55,72,48,85,65,92,78,95].map((h,i) => (
                        <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 transition-colors cursor-pointer" />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Floating cards */}
                <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} className="absolute -bottom-5 -left-5 glass rounded-2xl shadow-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center"><Check className="w-5 h-5 text-green-600" /></div>
                  <div><p className="text-sm font-bold text-gray-900">Deployed Successfully</p><p className="text-xs text-gray-500">v3.2.1 — 2.1s build</p></div>
                </motion.div>
                <motion.div animate={{ y: [0,6,0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }} className="absolute -top-3 -right-3 glass rounded-2xl shadow-xl p-3 flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-600" />
                  <span className="text-xs font-bold text-gray-800">AI Active</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== LOGO MARQUEE ===== */}
        <section className="py-14 border-y border-gray-100 bg-gray-50/50 overflow-hidden">
          <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-8">Trusted by Industry Leaders</p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10" />
            <div className="flex animate-marquee">
              {[...Array(2)].map((_, set) => (
                <div key={set} className="flex items-center gap-16 px-8 shrink-0">
                  {['Acme Corp', 'Globex', 'Initech', 'Umbrella Co', 'Stark Industries', 'Wayne Enterprises', 'Cyberdyne', 'Aperture'].map(c => (
                    <span key={`${set}-${c}`} className="text-xl font-bold text-gray-300 hover:text-blue-400 transition-colors duration-300 whitespace-nowrap cursor-default">{c}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-24 lg:py-32 relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center max-w-3xl mx-auto mb-16">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" /> Core Capabilities
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                Everything You Need to{' '}<span className="gradient-text">Ship Faster</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-lg text-gray-600">Powerful tools designed for modern engineering teams that demand reliability, speed, and intelligence.</motion.p>
            </motion.div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <motion.div key={f.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-sm card-hover relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${f.color} opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:opacity-[0.08] transition-opacity`} />
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                    <f.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
                  <div className="mt-4 flex items-center gap-1 text-blue-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ChevronRight className="w-4 h-4" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-900 to-blue-950 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-[0.04]" />
          <div className="absolute top-0 left-1/3 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center group">
                  <p className="text-4xl sm:text-5xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors">{s.value}</p>
                  <p className="text-sm text-gray-400 font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="py-24 lg:py-32 bg-gray-50/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center max-w-3xl mx-auto mb-16">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6">
                <MessageSquare className="w-4 h-4" /> Customer Stories
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                Loved by <span className="gradient-text">Engineering Teams</span>
              </motion.h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, i) => (
                <motion.div key={testimonial.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-lg transition-all card-hover relative flex flex-col">
                  <div className="flex gap-1 mb-6">{[...Array(testimonial.rating)].map((_, idx) => <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                  <p className="text-gray-700 leading-relaxed mb-8 text-sm flex-grow">{`"${testimonial.quote}"`}</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-md">{testimonial.name[0]}</div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.name}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== HOW IT WORKS ===== */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="text-center max-w-3xl mx-auto mb-16">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-semibold mb-6"><Layers className="w-4 h-4" /> How It Works</motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
                From Idea to Production in <span className="gradient-text">Minutes</span>
              </motion.h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
              {[
                { step: '01', icon: GitBranch, title: 'Connect Your Stack', desc: 'Link your GitHub repos, databases, and cloud providers in under 2 minutes with our guided setup wizard.' },
                { step: '02', icon: Bot, title: 'Configure AI & Workflows', desc: 'Choose your AI provider, set up automation pipelines, and define deployment rules with our visual builder.' },
                { step: '03', icon: Zap, title: 'Ship & Scale Globally', desc: 'Deploy to 40+ regions with one click. Auto-scaling, monitoring, and alerts work out of the box.' },
              ].map((item, i) => (
                <motion.div key={item.step} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-600/20 relative z-10">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Step {item.step}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900" />
          <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">Ready to Get Started?</motion.h2>
              <motion.p variants={fadeUp} className="mt-5 text-lg text-blue-100 max-w-2xl mx-auto">Join 12,000+ teams already building with NexusSaaS. Start your free trial today — no credit card required.</motion.p>
              <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup" className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-blue-700 bg-white hover:bg-blue-50 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5">
                  Start Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border-2 border-white/20 hover:border-white/40 hover:bg-white/5 rounded-2xl transition-all duration-300">
                  Contact Sales
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
