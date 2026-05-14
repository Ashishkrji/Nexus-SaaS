"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, Clock, Activity } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function StatusPage() {
  const systems = [
    { name: 'API Gateway', status: 'operational', uptime: '99.99%' },
    { name: 'AI Router', status: 'operational', uptime: '100%' },
    { name: 'Dashboard & Web App', status: 'operational', uptime: '99.98%' },
    { name: 'Edge Network (US)', status: 'operational', uptime: '99.99%' },
    { name: 'Edge Network (EU)', status: 'operational', uptime: '99.99%' },
    { name: 'Edge Network (Asia)', status: 'operational', uptime: '99.99%' },
    { name: 'Database Services', status: 'operational', uptime: '99.95%' },
  ];

  const pastIncidents = [
    { date: 'May 02, 2026', title: 'Elevated latency in EU-West', status: 'Resolved', duration: '45m' },
    { date: 'April 18, 2026', title: 'OpenAI API degraded performance', status: 'Resolved', duration: '2h 15m', note: 'AI Router successfully fell back to Anthropic during this window.' },
    { date: 'March 10, 2026', title: 'Dashboard login timeout', status: 'Resolved', duration: '12m' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">System Status</h1>
            <div className="flex items-center gap-3 p-6 bg-green-50 border border-green-200 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <h2 className="text-lg font-bold text-green-800">All Systems Operational</h2>
                <p className="text-green-600 text-sm">Last updated: Just now</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-16">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h3 className="font-bold text-gray-900">Current Status by Service</h3>
              <span className="text-xs text-gray-500 font-medium">Uptime (90 Days)</span>
            </div>
            <div className="divide-y divide-gray-100">
              {systems.map((sys, i) => (
                <motion.div key={sys.name} variants={fadeUp} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="font-semibold text-gray-900">{sys.name}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-gray-500">{sys.uptime}</span>
                    <span className="hidden sm:inline-block px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-md">Operational</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-gray-400" /> Past Incidents</h3>
            <div className="space-y-6">
              {pastIncidents.map(inc => (
                <div key={inc.title} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <h4 className="font-bold text-gray-900 text-lg">{inc.title}</h4>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-sm text-gray-500 font-medium"><Clock className="w-4 h-4" /> {inc.duration}</span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-md">{inc.status}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{inc.date}</p>
                  {inc.note && <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100">{inc.note}</p>}
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </main>
      <Footer />
    </div>
  );
}
