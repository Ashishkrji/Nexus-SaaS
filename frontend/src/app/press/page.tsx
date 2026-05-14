"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Newspaper, Rss } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function PressPage() {
  const news = [
    { title: 'NexusSaaS announces $50M Series B to build the ultimate developer platform', source: 'TechCrunch', date: 'May 01, 2026', type: 'Funding' },
    { title: 'How NexusSaaS is solving the AI routing problem for enterprises', source: 'Forbes', date: 'April 15, 2026', type: 'Feature' },
    { title: 'NexusSaaS launches multi-model AI router with Llama 3.1 support', source: 'VentureBeat', date: 'May 10, 2026', type: 'Product Launch' },
    { title: 'The rising stars of enterprise cloud infrastructure in 2026', source: 'Business Insider', date: 'March 22, 2026', type: 'Mention' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Press & Media" 
          title="NexusSaaS in the " 
          titleAccent="News" 
          description="Read our latest announcements, media coverage, and download our brand assets." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* News List */}
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2"><Newspaper className="w-6 h-6 text-blue-600" /> Recent Coverage</h2>
              {news.map((item, i) => (
                <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="group bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all card-hover">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md">{item.type}</span>
                    <span className="text-sm font-bold text-gray-900">{item.source}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">{item.title}</h3>
                  <Link href="#" className="inline-flex items-center text-sm font-bold text-blue-600">
                    Read Article <ArrowRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Media Kit Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-3xl p-8 text-white shadow-xl sticky top-24">
                <h3 className="text-xl font-bold mb-4">Media Kit & Brand Assets</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8">
                  Download our official logos, product screenshots, founder headshots, and brand guidelines for press use.
                </p>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors mb-4">
                  <Download className="w-4 h-4" /> Download Kit (.zip)
                </button>
                <p className="text-xs text-gray-500 text-center">Size: 45MB. Includes SVG, PNG, and PDF formats.</p>

                <hr className="border-gray-800 my-8" />
                
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4">PR Inquiries</h3>
                <p className="text-sm text-gray-400 mb-4">For press inquiries, interviews, or speaking engagements, please contact our PR team.</p>
                <a href="mailto:press@nexussaas.com" className="inline-flex items-center text-sm font-bold text-blue-400 hover:text-blue-300">
                  press@nexussaas.com <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
