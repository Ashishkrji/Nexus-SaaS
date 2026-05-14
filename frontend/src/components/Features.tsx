import { motion } from 'framer-motion';
import { MessageSquare, PenTool, Calendar, Globe, BarChart3, Palette, Bot, Shield } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  MessageSquare, PenTool, Calendar, Globe, BarChart3, Palette, Bot, Shield,
};

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
  green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
  cyan: { bg: 'bg-cyan-50', icon: 'text-cyan-600', border: 'border-cyan-100' },
  pink: { bg: 'bg-pink-50', icon: 'text-pink-600', border: 'border-pink-100' },
  indigo: { bg: 'bg-indigo-50', icon: 'text-indigo-600', border: 'border-indigo-100' },
  emerald: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100' },
};

const features = [
  { id: 1, title: 'AI Review Analysis', description: 'Automatically analyze customer reviews using advanced NLP models to extract sentiment, key topics, and actionable insights in real time.', icon_name: 'Bot', color: 'blue' },
  { id: 2, title: 'Smart Content Engine', description: 'Generate SEO-optimized posts, responses, and marketing copy with context-aware AI that understands your brand voice.', icon_name: 'PenTool', color: 'purple' },
  { id: 3, title: 'Automated Scheduling', description: 'Schedule and publish content across multiple platforms with intelligent timing algorithms that maximize audience engagement.', icon_name: 'Calendar', color: 'green' },
  { id: 4, title: 'Global Multi-Location', description: 'Manage hundreds of business locations from a single unified dashboard with bulk editing and location-specific analytics.', icon_name: 'Globe', color: 'orange' },
  { id: 5, title: 'Advanced Analytics', description: 'Deep performance dashboards with custom KPIs, competitive benchmarking, and predictive trend forecasting for data-driven decisions.', icon_name: 'BarChart3', color: 'cyan' },
  { id: 6, title: 'Brand Consistency', description: 'Maintain uniform brand identity across all channels with centralized style guides, approval workflows, and template libraries.', icon_name: 'Palette', color: 'pink' },
  { id: 7, title: 'Intelligent Chatbot', description: 'Deploy 24/7 AI chatbots that handle customer inquiries, route support tickets, and escalate complex issues to human agents seamlessly.', icon_name: 'MessageSquare', color: 'indigo' },
  { id: 8, title: 'Enterprise Security', description: 'SOC 2 Type II certified with end-to-end encryption, role-based access controls, audit logging, and GDPR-compliant data handling.', icon_name: 'Shield', color: 'emerald' },
];

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            Powerful Features
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Scale Your Business
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            From AI-powered review analysis to automated content publishing, our platform handles every aspect of your digital presence optimization.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon_name] || MessageSquare;
            const colors = colorMap[feature.color] || colorMap.blue;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
