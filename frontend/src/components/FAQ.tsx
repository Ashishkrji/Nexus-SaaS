import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { id: 1, question: 'What is NexusSaaS and who is it built for?', answer: 'NexusSaaS is an enterprise-grade cloud platform designed for modern engineering and product teams. It provides workflow automation, real-time analytics, AI-powered content generation, and multi-location management — all from a single unified dashboard. Whether you are a solo founder, a growing startup, or a large enterprise managing multiple clients, NexusSaaS scales to fit your needs.' },
  { id: 2, question: 'How does the 14-day free trial work?', answer: 'When you sign up for any paid plan (Pro, Business, or Agency), you get full access to all features for 14 days without entering a credit card. At the end of the trial, you can choose to subscribe or your account will automatically downgrade to the Free tier with no data loss.' },
  { id: 3, question: 'Can I switch plans at any time?', answer: 'Absolutely. You can upgrade or downgrade your plan at any time from your dashboard settings. When upgrading, you get immediate access to new features. When downgrading, changes take effect at the end of your current billing cycle. Prorated credits are applied automatically.' },
  { id: 4, question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank wire transfers for annual enterprise agreements. All transactions are processed through Stripe with PCI-DSS Level 1 compliance for maximum security.' },
  { id: 5, question: 'Is my data secure on NexusSaaS?', answer: 'Security is our top priority. We are SOC 2 Type II certified, use AES-256 encryption for all data at rest and TLS 1.3 for data in transit. We offer role-based access control (RBAC), detailed audit logging, and optional EU data residency. Our infrastructure is hosted on AWS with 99.99% uptime SLA.' },
  { id: 6, question: 'Do you offer custom enterprise solutions?', answer: 'Yes. Our Agency plan includes dedicated infrastructure, custom SLA agreements, premium onboarding, and a dedicated success manager. For organizations with unique compliance requirements, we also offer on-premise deployment options and custom Data Processing Agreements (DPAs). Contact our sales team to discuss your specific needs.' },
  { id: 7, question: 'What integrations are available?', answer: 'NexusSaaS natively integrates with Slack, Jira, GitHub, Stripe, Salesforce, Zapier, and many more. Our REST and GraphQL APIs allow you to build custom integrations with any tool in your stack. SDKs are available for Node.js, Python, Go, and Ruby.' },
  { id: 8, question: 'What kind of support do you provide?', answer: 'Free plan users have access to our community forums and knowledge base. Pro users get priority email support with 4-hour response times. Business and Agency plans include 24/7 priority support via chat, email, and phone, along with a dedicated account manager for strategic guidance.' },
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openId === faq.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
