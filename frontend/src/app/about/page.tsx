"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Building2, Users, Target, Globe, ArrowRight, TrendingUp, Zap, Shield, Rocket } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function AboutPage() {
  const stats = [
    { label: 'Founded', value: '2026' },
    { label: 'Global Team', value: '150+' },
    { label: 'Countries Served', value: '45+' },
    { label: 'Uptime', value: '99.99%' },
    { label: 'Daily API Requests', value: '50M+' },
    { label: 'Edge Locations', value: '40+' }
  ];

  const values = [
    { icon: Target, title: 'Customer First', desc: 'Everything we build starts with solving real problems for our users. Your success is our core metric.' },
    { icon: Globe, title: 'Think Globally', desc: 'Our team and our product are designed to operate without borders, scaling to reach users anywhere in the world.' },
    { icon: Users, title: 'Empower Teams', desc: 'We believe great tools help people collaborate and achieve more together, breaking down silos.' },
    { icon: TrendingUp, title: 'Continuous Growth', desc: 'We constantly iterate, improve, and learn from our mistakes to stay ahead of the technology curve.' },
    { icon: Zap, title: 'Speed is a Feature', desc: 'From our UI to our edge network, we prioritize extreme performance and minimal latency in everything.' },
    { icon: Shield, title: 'Secure by Design', desc: 'Security isn\'t an afterthought. It is woven into the fabric of our architecture from day one.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Our Story" 
          title="Building the Future of " 
          titleAccent="Cloud SaaS" 
          description="We are on a mission to democratize enterprise-grade infrastructure and AI capabilities for teams of all sizes, from solo developers to Fortune 500s." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                From a small idea to a <span className="text-blue-600">global platform</span>
              </motion.h2>
              <motion.div variants={fadeUp} className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  NexusSaaS was born out of frustration. As engineers, we were tired of patching together disparate tools to build, deploy, and scale our applications. We wanted a unified platform that just worked, without the vendor lock-in and opaque pricing.
                </p>
                <p>
                  We saw that integrating powerful AI models into production applications was too complex. Managing API keys, handling rate limits, and building fallback chains took weeks of engineering time away from actual product development.
                </p>
                <p>
                  In 2026, we launched NexusSaaS to solve these exact problems. Today, we provide a unified ecosystem that combines blazing-fast edge deployments, an intelligent Multi-Model AI Router, and enterprise-grade security into a single, cohesive dashboard.
                </p>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div key={stat.label} className="bg-blue-50/50 border border-blue-100 rounded-3xl p-6 text-center card-hover">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 mb-2">{stat.value}</div>
                  <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Why Nexus Section */}
        <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Why We Are Different</h2>
              <p className="text-gray-400 text-lg">We aren't just another cloud provider. We are your infrastructure partner.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                <Rocket className="w-10 h-10 text-blue-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Developer Experience First</h3>
                <p className="text-gray-400 leading-relaxed">We obsess over our CLI, dashboard, and API design. If a task takes more than three clicks, we redesign it until it takes one.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                <Shield className="w-10 h-10 text-emerald-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">Transparent & Predictable</h3>
                <p className="text-gray-400 leading-relaxed">No surprise bills at the end of the month. Our pricing is flat-rate and transparent, allowing you to scale without financial anxiety.</p>
              </div>
              <div className="bg-gray-800 p-8 rounded-3xl border border-gray-700">
                <Globe className="w-10 h-10 text-purple-400 mb-6" />
                <h3 className="text-xl font-bold mb-3">AI-Native Infrastructure</h3>
                <p className="text-gray-400 leading-relaxed">We built AI capabilities directly into the routing layer, not as an afterthought. Switch between GPT-4o, Claude, and Gemini instantly.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gray-50/50 border-y border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600">The principles that guide our decisions and shape our culture.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover text-center group">
                  <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    <v.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 max-w-4xl mx-auto px-4 text-center">
          <Building2 className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-600 mb-10">We're always looking for talented individuals to join our team and help build the future of cloud computing.</p>
          <Link href="/careers" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-blue-600 transition-colors shadow-lg">
            View Open Positions <ArrowRight className="w-5 h-5" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}
