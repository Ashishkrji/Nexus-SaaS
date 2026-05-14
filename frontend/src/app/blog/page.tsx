"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function BlogPage() {
  const posts = [
    { id: 1, category: 'Engineering', title: 'How we built a multi-model AI router with zero latency overhead', excerpt: 'Dive into the architecture behind our new AI router that seamlessly switches between OpenAI, Anthropic, Gemini, Grok, and Llama 3.1 based on dynamic rules.', author: 'Sarah Chen', date: 'May 12, 2026', readTime: '8 min read', image: 'bg-gradient-to-br from-blue-500 to-indigo-600' },
    { id: 2, category: 'Company', title: 'Announcing our Series B and the new Enterprise Tier', excerpt: 'We are excited to announce our $50M Series B funding led by Sequoia to accelerate our mission of building the ultimate developer platform.', author: 'Alex Rivera', date: 'May 01, 2026', readTime: '5 min read', image: 'bg-gradient-to-br from-purple-500 to-pink-600' },
    { id: 3, category: 'Tutorial', title: 'Deploying a Next.js 16 application to the Edge in 60 seconds', excerpt: 'A step-by-step guide to taking your Turbopack-powered Next.js application from localhost to 42 global regions using NexusSaaS.', author: 'Marcus Johnson', date: 'April 24, 2026', readTime: '12 min read', image: 'bg-gradient-to-br from-emerald-500 to-teal-600' },
    { id: 4, category: 'Product', title: 'Why we transitioned our dashboard to Framer Motion', excerpt: 'The reasoning, the challenges, and the performance benefits of rewriting our entire dashboard animation system.', author: 'Priya Sharma', date: 'April 15, 2026', readTime: '6 min read', image: 'bg-gradient-to-br from-orange-500 to-red-600' },
    { id: 5, category: 'Engineering', title: 'Scaling MongoDB to handle 10B+ requests per month', excerpt: 'Our journey of optimizing queries, implementing caching layers, and sharding our core databases to maintain sub-10ms latency.', author: 'David Kim', date: 'April 02, 2026', readTime: '10 min read', image: 'bg-gradient-to-br from-cyan-500 to-blue-600' },
    { id: 6, category: 'Tutorial', title: 'Securing your API keys with AES-256 encryption in Node.js', excerpt: 'Best practices for handling sensitive user credentials and API keys in a multi-tenant SaaS application.', author: 'Sarah Chen', date: 'March 20, 2026', readTime: '7 min read', image: 'bg-gradient-to-br from-slate-700 to-gray-900' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Our Blog" 
          title="Insights, Engineering, " 
          titleAccent="and Updates" 
          description="Read about our latest product announcements, deep technical dives from our engineering team, and thoughts on the future of cloud computing." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Post (First one) */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <Link href="#" className="group grid lg:grid-cols-2 gap-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden card-hover">
              <div className={`h-64 lg:h-full w-full ${posts[0].image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
              </div>
              <div className="p-8 sm:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider rounded-full">{posts[0].category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">{posts[0].title}</h2>
                <p className="text-gray-600 leading-relaxed mb-8 text-lg line-clamp-3">{posts[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-gray-500 font-medium">
                  <div className="flex items-center gap-2"><User className="w-4 h-4" /> {posts[0].author}</div>
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {posts[0].date}</div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Grid Posts */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post, i) => (
              <motion.div key={post.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Link href="#" className="group flex flex-col h-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden card-hover">
                  <div className={`h-48 w-full ${post.image} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur text-gray-900 text-xs font-bold uppercase tracking-wider rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500 font-medium pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {post.readTime}</div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <button className="px-8 py-4 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl shadow-sm hover:bg-gray-50 hover:shadow-md transition-all">
              Load More Articles
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
