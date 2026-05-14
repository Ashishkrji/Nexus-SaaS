import { motion } from 'framer-motion';
import { Palette, Eye, Globe, Layout } from 'lucide-react';

export default function Branding() {
  const items = [
    {
      icon: Palette,
      title: 'Custom Branding',
      description: 'Replace our logo and colors with yours. Your clients see your brand, not ours.',
      color: 'purple',
    },
    {
      icon: Layout,
      title: 'Custom Domain',
      description: 'Host the platform on your own domain. Fully white-labeled from URL to footer.',
      color: 'blue',
    },
    {
      icon: Eye,
      title: 'Client Portal',
      description: 'Give each client their own dashboard. They see only their data, branded as your service.',
      color: 'green',
    },
    {
      icon: Globe,
      title: 'Multi-Language',
      description: 'Serve clients globally with multi-language support for review replies and GBP posts.',
      color: 'orange',
    },
  ];

  const colorClasses: Record<string, { bg: string; icon: string; border: string }> = {
    purple: { bg: 'bg-purple-50', icon: 'text-purple-600', border: 'border-purple-100' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', border: 'border-green-100' },
    orange: { bg: 'bg-orange-50', icon: 'text-orange-600', border: 'border-orange-100' },
  };

  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 p-8">
              {/* Mock branded dashboard */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    AC
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">AgencyCo</p>
                    <p className="text-xs text-gray-400">Your Brand Here</p>
                  </div>
                </div>
                <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg">
                  White-Label
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                {['Primary', 'Secondary', 'Accent', 'Background'].map((label, i) => (
                  <div key={label} className="rounded-xl p-3 bg-gray-50">
                    <div
                      className={`w-full h-8 rounded-lg mb-2 ${
                        i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-teal-600' : i === 2 ? 'bg-amber-500' : 'bg-gray-100'
                      }`}
                    />
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Brand Preview</p>
                <div className="h-3 w-3/4 bg-emerald-200 rounded mb-2" />
                <div className="h-2 w-full bg-gray-200 rounded mb-1" />
                <div className="h-2 w-2/3 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-3"
            >
              <Palette className="w-6 h-6 text-purple-500" />
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
              <Palette className="w-4 h-4" />
              White-Label Ready
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Your Brand,{' '}
              <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Your Platform
              </span>
            </h2>
            <p className="mt-5 text-lg text-gray-600 leading-relaxed">
              Resell ProfilePulse as your own service. Full white-label customization means your clients never know we exist.
            </p>

            <div className="mt-10 space-y-6">
              {items.map((item, i) => {
                const colors = colorClasses[item.color];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`w-11 h-11 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{item.title}</h4>
                      <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
