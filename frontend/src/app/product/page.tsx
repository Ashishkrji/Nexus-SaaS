"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Server, Activity, Shield, ArrowRight, Zap, Code, RefreshCw, Cpu } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function ProductPage() {
  const highlights = [
    { icon: Server, title: 'Serverless Compute', desc: 'Deploy your code instantly without managing servers. Auto-scales from zero to millions of requests seamlessly.' },
    { icon: Activity, title: 'Real-time Telemetry', desc: 'Monitor your application performance with sub-second latency. Set up custom alerts and anomaly detection.' },
    { icon: Cpu, title: 'AI Infrastructure', desc: 'Built-in routing to top LLMs (OpenAI, Anthropic, Gemini) with automatic fallback and load balancing.' },
    { icon: Shield, title: 'Enterprise Security', desc: 'Bank-grade encryption, automated DDoS protection, and comprehensive compliance reporting out of the box.' }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="The Platform" 
          title="One Platform for " 
          titleAccent="Modern Engineering" 
          description="NexusSaaS provides the complete toolchain for teams to build, deploy, and scale web applications and AI services globally." 
        />

        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.div variants={fadeUp} className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6" />
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
                Deploy Globally in <span className="text-blue-600">Seconds</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-lg text-gray-600 leading-relaxed mb-8">
                Push your code to GitHub and we handle the rest. Our edge network automatically builds, optimizes, and distributes your application to 40+ regions worldwide, ensuring sub-50ms latency for all your users.
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-4">
                {['Instant rollbacks', 'Preview environments for every pull request', 'Custom domains with automated SSL'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600"><Check className="w-3.5 h-3.5" /></div>
                    {item}
                  </li>
                ))}
              </motion.ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl transform rotate-3 scale-105 opacity-20 blur-lg" />
              <div className="relative bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800 font-mono text-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-gray-500 ml-2">Terminal</span>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-300"><span className="text-blue-400">~/project</span> $ nexussaas deploy</p>
                  <p className="text-gray-400">► Building application...</p>
                  <p className="text-green-400">✓ Build successful (1.2s)</p>
                  <p className="text-gray-400">► Uploading to global edge network...</p>
                  <p className="text-green-400">✓ Distributed to 42 regions (0.8s)</p>
                  <p className="text-blue-300 mt-4">🚀 Deployment ready!</p>
                  <p className="text-gray-300">URL: <span className="text-white underline">https://app-prod.nexussaas.dev</span></p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover">
                <h.icon className="w-10 h-10 text-blue-600 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{h.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-[0.1] mix-blend-overlay" />
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">See NexusSaaS in Action</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">Experience the platform that engineering teams trust to scale their most critical applications.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Ensure Check icon is available
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);
