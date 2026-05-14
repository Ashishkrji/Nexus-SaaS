"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { PlayCircle, Calendar, Clock, Users, ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function WebinarsPage() {
  const webinars = [
    {
      title: 'Building Resilient AI Workflows with the Nexus Router',
      date: 'May 20, 2026',
      time: '10:00 AM PST',
      speaker: 'Sarah Chen, CTO',
      status: 'upcoming',
      image: 'bg-gradient-to-br from-blue-600 to-indigo-700'
    },
    {
      title: 'Scaling from 0 to 1M Requests on the Edge',
      date: 'June 05, 2026',
      time: '11:00 AM PST',
      speaker: 'Marcus Johnson, VP Eng',
      status: 'upcoming',
      image: 'bg-gradient-to-br from-emerald-500 to-teal-600'
    },
    {
      title: 'Deep Dive: Security & Compliance on NexusSaaS',
      date: 'April 12, 2026',
      time: '45 mins',
      speaker: 'Alex Rivera, CISO',
      status: 'ondemand',
      image: 'bg-gradient-to-br from-gray-800 to-gray-900'
    },
    {
      title: 'Automating Deployments with Webhooks and CI/CD',
      date: 'March 28, 2026',
      time: '60 mins',
      speaker: 'David Kim, DevRel',
      status: 'ondemand',
      image: 'bg-gradient-to-br from-purple-600 to-pink-600'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Live & On-Demand" 
          title="Learn from the " 
          titleAccent="Experts" 
          description="Join our engineering and product teams for deep dives, architectural discussions, and live Q&A sessions." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming & On-Demand Webinars</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-900 text-white text-sm font-bold rounded-lg shadow-sm">All</button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold rounded-lg">Upcoming</button>
              <button className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-bold rounded-lg">On-Demand</button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {webinars.map((w, i) => (
              <motion.div key={w.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <div className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden card-hover flex flex-col h-full">
                  <div className={`h-48 w-full ${w.image} relative flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
                    <PlayCircle className="w-16 h-16 text-white/80 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                    <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full backdrop-blur-sm ${w.status === 'upcoming' ? 'bg-blue-500/80 text-white' : 'bg-gray-900/60 text-white'}`}>
                      {w.status === 'upcoming' ? 'Upcoming' : 'On-Demand'}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">{w.title}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium mb-8 flex-grow">
                      <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-gray-400" /> {w.date}</div>
                      <div className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-gray-400" /> {w.time}</div>
                      <div className="flex items-center gap-1.5"><Users className="w-4 h-4 text-gray-400" /> {w.speaker}</div>
                    </div>
                    <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${w.status === 'upcoming' ? 'bg-gray-900 text-white hover:bg-gray-800' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                      {w.status === 'upcoming' ? 'Register Now' : 'Watch Recording'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
