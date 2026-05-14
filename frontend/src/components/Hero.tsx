import { motion } from 'framer-motion';
import { ArrowRight, Star, TrendingUp, MessageSquare, BarChart3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)', backgroundSize: '32px 32px'}} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              AI-Powered GBP Optimization
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
              Dominate Local Search with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                AI-Driven
              </span>{' '}
              Google Business Profiles
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed max-w-xl">
              Automate review replies, schedule GBP posts, analyze sentiment, and boost your local SEO rankings — all powered by cutting-edge AI models. White-label ready for agencies.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="#cta"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-2xl shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                See Features
              </a>
            </div>

            <div className="mt-12 flex items-center gap-8">
              <div className="flex -space-x-3">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-0.5">Trusted by 2,400+ businesses</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-gray-100 p-6 lg:p-8">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-gray-900">GBP Dashboard</h3>
                  <p className="text-sm text-gray-500">Real-time overview</p>
                </div>
                <div className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Live
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Star, label: 'Avg Rating', value: '4.8', change: '+0.3', color: 'yellow' },
                  { icon: MessageSquare, label: 'Reviews', value: '847', change: '+124', color: 'blue' },
                  { icon: TrendingUp, label: 'Visibility', value: '92%', change: '+18%', color: 'green' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-gray-50 rounded-2xl p-4">
                    <stat.icon className={`w-5 h-5 ${stat.color === 'yellow' ? 'text-yellow-500' : stat.color === 'blue' ? 'text-blue-500' : 'text-green-500'} mb-2`} />
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-xs text-green-600 font-medium mt-1">↑ {stat.change}</p>
                  </div>
                ))}
              </div>

              {/* Chart Placeholder */}
              <div className="bg-gray-50 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700">Search Impressions</p>
                  <BarChart3 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[35, 52, 45, 68, 55, 72, 48, 85, 65, 92, 78, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-blue-500 to-blue-400 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[10px] text-gray-400">Jan</span>
                  <span className="text-[10px] text-gray-400">Jun</span>
                  <span className="text-[10px] text-gray-400">Dec</span>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl shadow-blue-900/10 border border-gray-100 p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Auto-Reply Sent</p>
                <p className="text-xs text-gray-500">2.3s avg response time</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
