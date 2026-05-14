import { motion } from 'framer-motion';
import { Link2, Bot, BarChart3, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Link2,
    title: 'Connect Your GBP',
    description: 'Link your Google Business Profile in seconds. We support single and multi-location setups.',
    color: 'blue',
  },
  {
    icon: Bot,
    title: 'AI Analyzes & Acts',
    description: 'Our AI scans reviews, analyzes sentiment, and generates optimized replies and posts automatically.',
    color: 'purple',
  },
  {
    icon: BarChart3,
    title: 'Monitor Performance',
    description: 'Track your visibility, rankings, and engagement in real-time with our intuitive dashboard.',
    color: 'green',
  },
  {
    icon: Rocket,
    title: 'Grow Your Presence',
    description: 'Watch your local search rankings climb as AI continuously optimizes your profile.',
    color: 'orange',
  },
];

const colorClasses: Record<string, { bg: string; icon: string; border: string; line: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-200', line: 'from-blue-400' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-200', line: 'from-purple-400' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-200', line: 'from-green-400' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-200', line: 'from-orange-400' },
};

export default function HowItWorks() {
  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            Simple Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            How{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              ProfilePulse
            </span>{' '}
            Works
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            Get started in minutes. Our AI handles the heavy lifting while you focus on running your business.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const colors = colorClasses[step.color];
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative text-center"
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
                )}

                <div className="relative">
                  <div className={`w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center mx-auto mb-5`}>
                    <step.icon className={`w-9 h-9 ${colors.icon}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                    {i + 1}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
