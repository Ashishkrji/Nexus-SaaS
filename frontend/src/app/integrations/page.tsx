"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Code, Database, MessageSquare, CreditCard, Mail, Hash, Layout, PenTool, Video, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function IntegrationsPage() {
  const categories = ['All', 'Developer Tools', 'Communication', 'Databases', 'Design', 'Payments'];
  
  const integrations = [
    { name: 'GitHub', category: 'Developer Tools', icon: Code, desc: 'Auto-deploy from repositories, preview branches, and sync issues.', color: 'text-gray-900', bg: 'bg-gray-100' },
    { name: 'Slack', category: 'Communication', icon: Hash, desc: 'Receive deployment notifications, alerts, and team activity directly in channels.', color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'PostgreSQL', category: 'Databases', icon: Database, desc: 'Connect to managed databases or external clusters with automated migrations.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Stripe', category: 'Payments', icon: CreditCard, desc: 'Sync customer data, manage subscriptions, and trigger webhooks on payment events.', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Figma', category: 'Design', icon: PenTool, desc: 'Sync design tokens automatically and inspect components directly in your workflow.', color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Zoom', category: 'Communication', icon: Video, desc: 'Automatically schedule meetings and sync recordings to your workspace.', color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Trello', category: 'Developer Tools', icon: Layout, desc: 'Create cards from error reports and sync deployment status to boards.', color: 'text-blue-700', bg: 'bg-blue-50' },
    { name: 'Mailchimp', category: 'Communication', icon: Mail, desc: 'Sync user signups and trigger automated email campaigns on specific events.', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { name: 'Intercom', category: 'Communication', icon: MessageSquare, desc: 'Sync customer data and track in-app events for better support context.', color: 'text-blue-500', bg: 'bg-blue-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Integrations & API" 
          title="Connect Your Entire " 
          titleAccent="Stack" 
          description="NexusSaaS plays nicely with the tools your team already uses. Connect your repositories, communication channels, and databases in one click." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {categories.map((c, i) => (
              <button key={c} className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${i === 0 ? 'bg-gray-900 text-white shadow-md' : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50'}`}>
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations.map((integration, i) => (
              <motion.div key={integration.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-3xl p-8 border border-gray-100 shadow-sm card-hover relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${integration.bg} ${integration.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <integration.icon className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-semibold px-3 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-100">{integration.category}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{integration.name}</h3>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-6">{integration.desc}</p>
                <button className="flex items-center text-sm font-bold text-blue-600 group-hover:text-blue-700">
                  Connect <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* API CTA */}
        <section className="py-24 bg-gradient-to-br from-gray-900 to-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 dot-pattern opacity-[0.05]" />
          <div className="absolute right-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">Need something custom? Use our GraphQL API.</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Build your own integrations, automate workflows, and extract data exactly how you need it. Our comprehensive API provides full programmatic access to your entire workspace.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/api-docs" className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl shadow-lg hover:bg-gray-100 transition-colors">
                    Read the API Docs
                  </Link>
                  <Link href="/signup" className="px-6 py-3 bg-blue-600/20 text-blue-300 font-bold rounded-xl border border-blue-500/30 hover:bg-blue-600/30 transition-colors">
                    Generate API Key
                  </Link>
                </div>
              </div>
              <div className="bg-slate-950 rounded-2xl p-6 border border-slate-800 shadow-2xl font-mono text-sm text-gray-300 overflow-x-auto">
                <pre><code>{`query GetProjectDeployments {
  project(id: "prj_123abc") {
    name
    environment
    deployments(first: 5) {
      edges {
        node {
          id
          status
          createdAt
          commitMessage
          creator {
            name
            email
          }
        }
      }
    }
  }
}`}</code></pre>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
