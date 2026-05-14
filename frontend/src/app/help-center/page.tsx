"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Search, Book, MessageCircle, FileText, Video, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function HelpCenterPage() {
  const categories = [
    { icon: Book, title: 'Getting Started', desc: 'Quick start guides, platform overview, and account setup.' },
    { icon: FileText, title: 'Billing & Plans', desc: 'Manage your subscription, invoices, and understand usage limits.' },
    { icon: MessageCircle, title: 'AI Integration', desc: 'How to configure providers, manage API keys, and use the AI Router.' },
    { icon: Video, title: 'Deployments', desc: 'Troubleshooting builds, setting up domains, and edge networking.' },
  ];

  const popularArticles = [
    'How to connect a custom domain',
    'Understanding the AI Router fallback chain',
    'Setting up SSO/SAML for your team',
    'Troubleshooting "Build Failed" errors',
    'How to upgrade or downgrade your plan'
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Support" 
          title="How can we " 
          titleAccent="help you?" 
          description="Search our knowledge base or browse categories below to find the answers you need." 
        />

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-8 mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-2 rounded-2xl shadow-xl shadow-blue-900/5 border border-gray-100 flex items-center">
            <Search className="w-6 h-6 text-gray-400 ml-4 mr-2" />
            <input 
              type="text" 
              placeholder="Search for articles, guides, or keywords..." 
              className="w-full px-4 py-4 text-gray-900 placeholder-gray-400 focus:outline-none rounded-xl text-lg"
            />
            <button className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
              Search
            </button>
          </motion.div>
        </section>

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((c, i) => (
              <motion.div key={c.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Link href="#" className="block h-full bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <c.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Articles</h3>
              <ul className="space-y-4">
                {popularArticles.map(article => (
                  <li key={article}>
                    <Link href="#" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium transition-colors group">
                      <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                      {article}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 shadow-xl text-white flex flex-col justify-center">
              <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
              <p className="text-blue-100 mb-8 leading-relaxed">Our support engineers are available 24/7 to help you resolve technical issues, billing inquiries, or feature requests.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-gray-50 transition-colors text-center">
                  Contact Support
                </Link>
                <Link href="/community" className="px-6 py-3 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors text-center">
                  Ask the Community
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
