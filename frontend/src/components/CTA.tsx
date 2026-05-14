import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Building2, Rocket } from 'lucide-react';

export default function CTA() {
  const [form, setForm] = useState({ name: '', email: '', company: '', plan: 'pro' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900" />
      <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Dominate Local Search?
            </h2>
            <p className="mt-5 text-lg text-blue-100 leading-relaxed">
              Join 2,400+ businesses and agencies already using ProfilePulse to automate their Google Business Profile management and boost local visibility.
            </p>

            <div className="mt-10 space-y-4">
              {[
                '14-day free trial, no credit card required',
                'White-label ready for agencies',
                'Free Nvidia AI models included on all plans',
                'Cancel anytime — no lock-in contracts',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-500/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-blue-50 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-6">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-blue-300" />
                <div>
                  <p className="text-white font-semibold text-sm">For Businesses</p>
                  <p className="text-blue-200 text-xs">Boost your local rankings</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Rocket className="w-5 h-5 text-blue-300" />
                <div>
                  <p className="text-white font-semibold text-sm">For Agencies</p>
                  <p className="text-blue-200 text-xs">Scale GBP services white-label</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 text-center shadow-2xl">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">You're In!</h3>
                <p className="text-gray-600 mt-2">Check your email for next steps. Your 14-day free trial starts now.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Start Your Free Trial</h3>
                <p className="text-sm text-gray-500 mb-8">No credit card required. Full access for 14 days.</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Work Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Plan Interest</label>
                    <select
                      value={form.plan}
                      onChange={e => setForm({ ...form, plan: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-900 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
                    >
                      <option value="free">Free — Nvidia AI Models</option>
                      <option value="starter">Starter — $29/mo</option>
                      <option value="pro">Pro — $79/mo (Most Popular)</option>
                      <option value="agency">Agency — $199/mo</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {submitting ? 'Starting Trial...' : 'Start Free Trial'}
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-xs text-gray-400 text-center mt-4">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
