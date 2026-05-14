"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, Code, Cpu, Shield, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function GuidesPage() {
  const categories = [
    { name: 'Getting Started', count: 12 },
    { name: 'Deployment', count: 24 },
    { name: 'AI Integration', count: 18 },
    { name: 'Security', count: 9 },
    { name: 'Databases', count: 15 },
  ];

  const guides = [
    { title: 'Deploying a Next.js App to the Edge', category: 'Deployment', time: '10 min read', icon: Terminal, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: 'Setting up the AI Router for OpenAI & Anthropic', category: 'AI Integration', time: '15 min read', icon: Cpu, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: 'Configuring custom domains with automated SSL', category: 'Deployment', time: '5 min read', icon: Code, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { title: 'Implementing Role-Based Access Control (RBAC)', category: 'Security', time: '20 min read', icon: Shield, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { title: 'Connecting to a Managed PostgreSQL Instance', category: 'Databases', time: '12 min read', icon: Database, color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Quickstart: Your first 5 minutes on NexusSaaS', category: 'Getting Started', time: '5 min read', icon: BookOpen, color: 'text-rose-500', bg: 'bg-rose-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Resources" 
          title="In-Depth " 
          titleAccent="Guides" 
          description="Step-by-step tutorials, architectural patterns, and best practices for building on NexusSaaS." 
        />

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            
            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-64 flex-shrink-0">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 px-2">Categories</h3>
              <nav className="space-y-1">
                <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold bg-blue-50 text-blue-700">
                  All Guides
                  <span className="bg-white text-blue-700 px-2 py-0.5 rounded-full text-xs">78</span>
                </button>
                {categories.map((c) => (
                  <button key={c.name} className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                    {c.name}
                    <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full text-xs">{c.count}</span>
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Grid */}
            <div className="flex-grow grid sm:grid-cols-2 gap-6 w-full">
              {guides.map((g, i) => (
                <motion.div key={g.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                  <Link href="#" className="group flex flex-col h-full bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm card-hover">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${g.bg} ${g.color}`}>
                        <g.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{g.category}</span>
                        <p className="text-xs text-gray-500 font-medium">{g.time}</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4 line-clamp-2">
                      {g.title}
                    </h3>
                    <div className="mt-auto flex items-center text-sm font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      Read Guide <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
