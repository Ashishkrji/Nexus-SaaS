"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, ArrowRight, Heart, Zap, Coffee, Globe } from 'lucide-react';
import Link from 'next/link';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function CareersPage() {
  const perks = [
    { icon: Globe, title: 'Remote First', desc: 'Work from anywhere in the world. We care about your output, not your location or your hours.' },
    { icon: Heart, title: 'Health & Wellness', desc: 'Premium medical, dental, and vision coverage for you and your dependents. 100% paid by us.' },
    { icon: Zap, title: 'Home Office Setup', desc: '$2,000 stipend to build your perfect remote workspace, plus a new laptop of your choice.' },
    { icon: Coffee, title: 'Unlimited PTO', desc: 'Take the time you need to recharge. We mandate a minimum of 4 weeks off per year.' }
  ];

  const jobs = [
    { department: 'Engineering', title: 'Senior AI Systems Engineer', location: 'Remote (US/EU)', type: 'Full-time' },
    { department: 'Engineering', title: 'Frontend Developer (React/Next.js)', location: 'Remote (Global)', type: 'Full-time' },
    { department: 'Engineering', title: 'DevOps & Site Reliability Engineer', location: 'San Francisco / Remote', type: 'Full-time' },
    { department: 'Product', title: 'Product Manager, Enterprise', location: 'Remote (US)', type: 'Full-time' },
    { department: 'Sales', title: 'Enterprise Account Executive', location: 'New York / Remote', type: 'Full-time' },
    { department: 'Design', title: 'Senior Product Designer', location: 'Remote (Global)', type: 'Full-time' }
  ];

  const departments = Array.from(new Set(jobs.map(j => j.department)));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Join the Team" 
          title="Build the Platform of " 
          titleAccent="Tomorrow" 
          description="We're a team of engineers, designers, and creators passionate about building tools that empower developers worldwide. Join us." 
        />

        {/* Perks */}
        <section className="py-20 bg-gray-50/50 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Work With Us?</h2>
              <p className="text-gray-600">We invest heavily in our team's happiness, health, and growth.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {perks.map((p, i) => (
                <motion.div key={p.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover text-center">
                  <div className="w-14 h-14 mx-auto bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-gray-600">Don't see a perfect fit? Send your resume to <a href="mailto:careers@nexussaas.com" className="text-blue-600 hover:underline">careers@nexussaas.com</a></p>
          </div>

          <div className="space-y-12">
            {departments.map((dept, i) => (
              <motion.div key={dept} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  {dept} <span className="text-xs font-semibold px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full">{jobs.filter(j => j.department === dept).length}</span>
                </h3>
                <div className="space-y-4">
                  {jobs.filter(j => j.department === dept).map((job) => (
                    <Link key={job.title} href="#" className="group block bg-white border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{job.title}</h4>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-medium">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                            <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.type}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors w-fit">
                          Apply Now <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </Link>
                  ))}
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
