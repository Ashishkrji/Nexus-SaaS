import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    id: 1,
    name: 'Free',
    price_monthly: 0,
    price_yearly: 0,
    description: 'Perfect for individuals and small projects getting started.',
    features: '1 Project Workspace|Up to 500 API Requests/mo|Community Support|Basic Analytics Dashboard|1 Team Member|SSL Encryption Included',
    popular: false,
    cta_text: 'Get Started Free',
  },
  {
    id: 2,
    name: 'Pro',
    price_monthly: 29,
    price_yearly: 23,
    description: 'Ideal for growing teams that need advanced features and support.',
    features: '10 Project Workspaces|Up to 25,000 API Requests/mo|Priority Email Support|Advanced Analytics & Reports|5 Team Members|Custom Domain Support|Webhook Integrations|Role-Based Access Control',
    popular: true,
    cta_text: 'Start Pro Trial',
  },
  {
    id: 3,
    name: 'Business',
    price_monthly: 79,
    price_yearly: 63,
    description: 'Built for scaling companies with complex workflow requirements.',
    features: '50 Project Workspaces|Up to 200,000 API Requests/mo|24/7 Priority Support|Full Analytics Suite with Export|25 Team Members|Custom Domain + White Label|All Integrations Included|Advanced RBAC & Audit Logs|SLA 99.95% Uptime Guarantee|Dedicated Account Manager',
    popular: false,
    cta_text: 'Start Business Trial',
  },
  {
    id: 4,
    name: 'Agency',
    price_monthly: 199,
    price_yearly: 159,
    description: 'Enterprise-grade power for agencies managing multiple clients.',
    features: 'Unlimited Workspaces|Unlimited API Requests|Dedicated 24/7 Phone + Chat|Custom Analytics & BI Connectors|Unlimited Team Members|Full White Label Branding|Custom API Integrations & Webhooks|Enterprise SSO (SAML/OIDC)|SLA 99.99% Uptime Guarantee|Dedicated Success Manager|Custom SLA & DPA Agreements|On-Premise Deployment Option',
    popular: false,
    cta_text: 'Contact Sales',
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <section id="pricing" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Simple,{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Honest Pricing
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Start free and scale as you grow. No hidden fees, no surprise charges. Upgrade or downgrade anytime with instant effect.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-4 bg-gray-100 rounded-2xl p-1.5">
            <button
              onClick={() => setAnnual(false)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${!annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl transition-all ${annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}
            >
              Annual <span className="text-green-600 text-xs font-bold ml-1">-20%</span>
            </button>
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => {
            const price = annual ? plan.price_yearly : plan.price_monthly;
            const featureList = plan.features ? plan.features.split('|') : [];
            const isPopular = plan.popular;

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-600/25 scale-[1.02] lg:scale-105'
                    : 'bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                <h3 className={`text-lg font-bold ${isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
                <p className={`text-sm mt-1 ${isPopular ? 'text-blue-100' : 'text-gray-500'}`}>{plan.description}</p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl font-extrabold ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                      ${price}
                    </span>
                    {price > 0 && (
                      <span className={`text-sm ${isPopular ? 'text-blue-200' : 'text-gray-500'}`}>
                        /mo
                      </span>
                    )}
                  </div>
                  {annual && price > 0 && (
                    <p className={`text-xs mt-1 ${isPopular ? 'text-blue-200' : 'text-gray-400'}`}>
                      Billed annually
                    </p>
                  )}
                </div>

                <ul className="space-y-3 mb-8">
                  {featureList.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isPopular ? 'text-blue-200' : 'text-green-500'}`} />
                      <span className={`text-sm ${isPopular ? 'text-blue-50' : 'text-gray-600'}`}>{f.trim()}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.name === 'Agency' ? '/contact' : '/signup'}
                  className={`block text-center px-6 py-3.5 rounded-2xl text-sm font-semibold transition-all ${
                    isPopular
                      ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-lg'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/20'
                  }`}
                >
                  {plan.cta_text}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* AI Model Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Enterprise-Grade Flexibility</h4>
            <p className="text-sm text-gray-600 mt-1">
              All paid plans include a 14-day free trial with full feature access. Need a custom plan for your organization? Our Agency tier includes dedicated infrastructure, custom SLAs, and premium onboarding support. Contact our sales team for tailored enterprise pricing.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
