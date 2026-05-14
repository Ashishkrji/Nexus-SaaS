"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Check, X, Zap, ArrowRight, Shield, Bot, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } };

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const plans = [
    { name: 'Free', price: 0, annualPrice: 0, desc: 'For individuals and side projects.', badge: '', cta: 'Get Started Free', popular: false, features: ['1 workspace', '500 API requests/mo', 'NVIDIA AI (Llama 3.1)', 'Community support', 'Basic analytics', '1 team member'] },
    { name: 'Pro', price: 29, annualPrice: 23, desc: 'For growing teams and startups.', badge: 'Most Popular', cta: 'Start Pro Trial', popular: true, features: ['10 workspaces', '25,000 API requests/mo', 'All 5 AI providers', 'Priority email support', 'Advanced analytics', '5 team members', 'Custom domains', 'API webhooks'] },
    { name: 'Business', price: 79, annualPrice: 63, desc: 'For scaling companies.', badge: '', cta: 'Start Business Trial', popular: false, features: ['50 workspaces', '200,000 API requests/mo', 'All 5 AI providers', '24/7 priority support', 'Custom dashboards', '25 team members', 'SSO / SAML', 'Audit logs', 'SLA 99.95%'] },
    { name: 'Agency', price: 199, annualPrice: 159, desc: 'For agencies and enterprises.', badge: 'Enterprise', cta: 'Contact Sales', popular: false, features: ['Unlimited workspaces', 'Unlimited API requests', 'All 5 AI providers + priority', 'Dedicated account manager', 'White-label options', 'Unlimited team members', 'SSO / SAML / SCIM', 'Full audit logs', 'SLA 99.99%', 'Custom integrations'] },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Transparent Pricing" title="Plans That Scale " titleAccent="With You" description="Start free, upgrade when you're ready. All paid plans include a 14-day free trial with no credit card required." />
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <span className={`text-sm font-semibold ${!annual ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative w-14 h-7 rounded-full transition-colors ${annual ? 'bg-blue-600' : 'bg-gray-300'}`}>
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${annual ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </button>
            <span className={`text-sm font-semibold ${annual ? 'text-gray-900' : 'text-gray-400'}`}>Annual <span className="text-green-600 text-xs font-bold ml-1">Save 20%</span></span>
          </div>
          {/* Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div key={plan.name} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-7 flex flex-col card-hover ${plan.popular ? 'bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-2xl shadow-blue-600/20 ring-2 ring-blue-500 scale-[1.02]' : 'bg-white border border-gray-100 shadow-sm'}`}>
                {plan.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.popular ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-900 text-white'}`}>
                    {plan.badge}
                  </span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.popular ? 'text-blue-100' : 'text-gray-500'}`}>{plan.desc}</p>
                <div className="mb-6">
                  <span className={`text-4xl font-extrabold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>${annual ? plan.annualPrice : plan.price}</span>
                  {plan.price > 0 && <span className={`text-sm ml-1 ${plan.popular ? 'text-blue-200' : 'text-gray-400'}`}>/month</span>}
                </div>
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${plan.popular ? 'text-blue-50' : 'text-gray-600'}`}>
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-200' : 'text-blue-500'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={plan.name === 'Agency' ? '/contact' : plan.name === 'Free' ? '/signup' : `/checkout/${plan.name.toLowerCase()}`}
                  className={`block text-center py-3.5 rounded-xl font-bold text-sm transition-all duration-300 hover:-translate-y-0.5 ${plan.popular ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </section>


        {/* Comparison Section */}
        <section className="py-24 bg-gray-50/50 border-y border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Why Choose NexusSaaS?</h2>
              <p className="text-gray-600 text-lg">Compare us with traditional cloud providers and see the difference.</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-900/5 border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-6 text-sm font-bold text-gray-900 w-1/3">Features</th>
                      <th className="p-6 text-sm font-extrabold text-blue-700 bg-blue-50/50 w-1/3 text-center border-x border-blue-100">NexusSaaS</th>
                      <th className="p-6 text-sm font-bold text-gray-500 w-1/3 text-center">Other Providers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm">
                    {[
                      { feature: 'Setup Time', nexus: 'Under 2 minutes', other: 'Hours to Days' },
                      { feature: 'AI Integration', nexus: 'Built-in Multi-Model Router', other: 'Requires 3rd Party APIs' },
                      { feature: 'Edge Deployments', nexus: 'Instant (40+ Regions)', other: 'Manual Configuration' },
                      { feature: 'Security', nexus: 'AES-256 & SOC 2 Included', other: 'Paid Add-on' },
                      { feature: 'Pricing Model', nexus: 'Transparent, Flat-rate options', other: 'Complex, Usage-heavy' },
                      { feature: 'Support', nexus: '24/7 Priority Support', other: 'Community or Expensive Tiers' },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                        <td className="p-6 font-medium text-gray-900">{row.feature}</td>
                        <td className="p-6 font-semibold text-blue-700 bg-blue-50/20 border-x border-blue-50">
                          <div className="flex items-center justify-center gap-2">
                            <Check className="w-4 h-4 text-blue-600" /> {row.nexus}
                          </div>
                        </td>
                        <td className="p-6 text-gray-500">
                          <div className="flex items-center justify-center gap-2">
                            <X className="w-4 h-4 text-gray-400" /> {row.other}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Trust section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[{ icon: Shield, text: 'SOC 2 Type II' }, { icon: Bot, text: '5 AI Providers' }, { icon: Crown, text: '14-Day Free Trial' }, { icon: Star, text: '99.99% Uptime' }].map(t => (
                <div key={t.text} className="flex items-center gap-2 text-sm text-gray-500 font-medium">
                  <t.icon className="w-4 h-4 text-blue-500" /> {t.text}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
