"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, Send, ArrowRight, Building2, MapPin } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Get in Touch" 
          title="We're Here to " 
          titleAccent="Help You" 
          description="Whether you have a question about enterprise pricing, custom integrations, or technical support, our team is ready to assist." 
        />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-16">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            
            {/* Contact Info */}
            <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="lg:col-span-2 space-y-8">
              <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Chat Support</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Our support team is available 24/7. Average response times are under 4 minutes for paid plans.</p>
                <a href="mailto:support@nexussaas.com" className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-700">
                  support@nexussaas.com <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover">
                <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
                  <Mail className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Enterprise Sales</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">Looking for custom SLAs, dedicated infrastructure, or volume discounts? Talk to our sales team.</p>
                <a href="mailto:sales@nexussaas.com" className="inline-flex items-center text-sm font-bold text-purple-600 hover:text-purple-700">
                  sales@nexussaas.com <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </motion.div>

              <motion.div variants={fadeUp} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm card-hover">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">Global Headquarters</h4>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">123 Cloud Way, Suite 400<br/>San Francisco, CA 94105<br/>United States</p>
                <div className="inline-flex items-center text-sm font-bold text-emerald-600">
                  +1 (800) 555-NEXUS
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <h3 className="text-2xl font-extrabold text-gray-900 mb-2 relative z-10">Send Us a Message</h3>
                <p className="text-gray-600 mb-8 relative z-10">Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form onSubmit={e => { e.preventDefault(); alert('Message sent successfully!'); }} className="space-y-6 relative z-10">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                      <input type="text" placeholder="John Doe" required className="w-full px-5 py-3.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 focus:bg-white transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Work Email</label>
                      <input type="email" placeholder="john@company.com" required className="w-full px-5 py-3.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 focus:bg-white transition-all text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Company Name</label>
                      <input type="text" placeholder="Acme Inc." className="w-full px-5 py-3.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 focus:bg-white transition-all text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">Subject</label>
                      <select required className="w-full px-5 py-3.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 focus:bg-white transition-all text-sm appearance-none">
                        <option value="" disabled selected>How can we help?</option>
                        <option value="sales">Sales & Pricing</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                    <textarea rows={5} placeholder="Provide details about your inquiry..." required className="w-full px-5 py-3.5 bg-gray-50/50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-blue-600 focus:bg-white transition-all text-sm resize-none" />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors duration-300">
                    <Send className="w-4 h-4" /> Send Message
                  </button>
                  <p className="text-xs text-center text-gray-500 mt-4">By submitting this form, you agree to our <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
                </form>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
