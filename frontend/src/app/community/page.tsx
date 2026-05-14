"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { MessageSquare, Users, Code, Hash, Trophy, Heart } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function CommunityPage() {
  const platforms = [
    { icon: MessageSquare, name: 'Discord Server', desc: 'Join 5,000+ developers talking about edge computing, AI, and Next.js.', cta: 'Join Discord', link: '#', color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { icon: Code, name: 'GitHub Discussions', desc: 'Ask questions, share ideas, and contribute to our open-source tools.', cta: 'View GitHub', link: '#', color: 'text-gray-900', bg: 'bg-gray-100' },
    { icon: Hash, name: 'Twitter Community', desc: 'Follow for the latest announcements, quick tips, and community highlights.', cta: 'Follow Us', link: '#', color: 'text-blue-400', bg: 'bg-blue-50' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Community" 
          title="Connect with " 
          titleAccent="Builders" 
          description="Join thousands of developers, founders, and engineers building the next generation of applications on NexusSaaS." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {platforms.map((p, i) => (
              <motion.div key={p.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm card-hover flex flex-col text-center">
                <div className={`w-16 h-16 mx-auto rounded-2xl ${p.bg} ${p.color} flex items-center justify-center mb-6`}>
                  <p.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{p.name}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{p.desc}</p>
                <Link href={p.link} className={`block w-full py-3 rounded-xl font-bold text-sm transition-colors ${p.bg} ${p.color} hover:opacity-80`}>
                  {p.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-blue-950 rounded-3xl p-8 lg:p-16 relative overflow-hidden text-center text-white">
            <div className="absolute inset-0 dot-pattern opacity-10" />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative z-10">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">NexusSaaS Champions Program</h2>
              <p className="text-lg text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                Are you passionate about building on NexusSaaS and helping others? Join our Champions program to get early access to features, exclusive swag, and direct access to our engineering team.
              </p>
              <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl shadow-xl hover:bg-gray-100 transition-colors">
                Apply to be a Champion
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
