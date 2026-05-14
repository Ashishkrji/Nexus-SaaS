"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Rocket, Shield, Bug, Zap, Star } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function ChangelogPage() {
  const updates = [
    {
      version: 'v3.2.0',
      date: 'May 10, 2026',
      title: 'Multi-Model AI Router & Llama 3.1',
      type: 'feature',
      icon: Rocket,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
      changes: [
        'Added support for 5 distinct AI providers: OpenAI, Anthropic, Gemini, xAI Grok, and NVIDIA NIM.',
        'Introduced the intelligent AI Router with automatic fallback chain capabilities.',
        'Added Llama 3.1 (70B & 8B), Mistral, and Nemotron models to the free tier.',
        'New AI Settings dashboard for managing provider API keys and usage tracking.'
      ]
    },
    {
      version: 'v3.1.4',
      date: 'April 28, 2026',
      title: 'Enhanced Edge Caching & Performance',
      type: 'improvement',
      icon: Zap,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
      changes: [
        'Optimized edge routing reducing global latency by an average of 14ms.',
        'Introduced stale-while-revalidate caching strategies for static assets.',
        'Improved build times by 22% for Next.js applications using Turbopack.'
      ]
    },
    {
      version: 'v3.1.3',
      date: 'April 15, 2026',
      title: 'Security Patch & SSO Updates',
      type: 'security',
      icon: Shield,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      changes: [
        'Patched a potential vulnerability in the JWT token refresh rotation.',
        'Added support for SCIM provisioning in the Agency plan.',
        'Enforced AES-256 encryption for all user-provided API keys at rest.'
      ]
    },
    {
      version: 'v3.1.0',
      date: 'March 01, 2026',
      title: 'The Enterprise Release',
      type: 'major',
      icon: Star,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
      changes: [
        'Launched the new Business and Agency plans with dedicated infrastructure.',
        'Added custom domains with automated SSL generation via Let\'s Encrypt.',
        'Introduced the visual workflow builder for no-code automation pipelines.',
        'Comprehensive SOC 2 Type II compliance achieved.'
      ]
    },
    {
      version: 'v3.0.5',
      date: 'February 12, 2026',
      title: 'Bug Fixes & UX Polish',
      type: 'fix',
      icon: Bug,
      color: 'bg-red-50 text-red-600 border-red-100',
      changes: [
        'Fixed an issue where GitHub webhooks would occasionally timeout.',
        'Resolved a UI glitch in the deployment logs viewer.',
        'Corrected billing calculation for prorated mid-month upgrades.'
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Product Updates" 
          title="What's New in " 
          titleAccent="NexusSaaS" 
          description="Keep track of new features, performance improvements, security updates, and bug fixes." 
        />

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {updates.map((update, i) => (
              <motion.div key={update.version} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} transition={{ duration: 0.5 }} className="relative pl-8 sm:pl-32">
                
                {/* Timeline Line */}
                <div className="absolute top-0 bottom-[-4rem] left-[15px] sm:left-[108px] w-px bg-gray-200" />
                
                {/* Timeline Node */}
                <div className={`absolute top-0 left-0 sm:left-[93px] w-8 h-8 rounded-full border-4 border-white ${update.color} flex items-center justify-center z-10 shadow-sm`}>
                  <update.icon className="w-3.5 h-3.5" />
                </div>

                {/* Date for Desktop */}
                <div className="hidden sm:block absolute top-1 left-0 w-20 text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{new Date(update.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(update.date).getFullYear()}</p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm card-hover">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${update.color}`}>
                      {update.version}
                    </span>
                    <span className="sm:hidden text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {update.date}
                    </span>
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-3 py-1 rounded-full">
                      {update.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{update.title}</h3>
                  <ul className="space-y-4">
                    {update.changes.map((change, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-500 text-sm">Looking for older updates? Check out our <a href="#" className="text-blue-600 font-bold hover:underline">GitHub Releases</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
