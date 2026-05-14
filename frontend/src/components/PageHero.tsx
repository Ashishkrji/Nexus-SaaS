"use client";

import { motion } from 'framer-motion';

interface Props {
  badge?: string;
  title: string;
  titleAccent?: string;
  description: string;
  dark?: boolean;
}

export default function PageHero({ badge, title, titleAccent, description, dark }: Props) {
  return (
    <section className={`pt-28 lg:pt-36 pb-20 lg:pb-28 relative overflow-hidden ${dark ? 'bg-gray-950 text-white' : 'bg-gradient-to-b from-blue-50/50 via-white to-white'}`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 dot-pattern opacity-[0.03]" />
      <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-blob ${dark ? 'bg-blue-900/20' : 'bg-blue-200/30'}`} />
      <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-3xl animate-blob ${dark ? 'bg-indigo-900/15' : 'bg-indigo-200/20'}`} style={{ animationDelay: '2s' }} />

      {/* Floating decorative elements */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className={`absolute top-32 right-[15%] w-16 h-16 rounded-2xl border ${dark ? 'border-blue-800/30 bg-blue-900/10' : 'border-blue-200/50 bg-blue-100/20'} hidden lg:block`}
      />
      <motion.div
        animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className={`absolute bottom-20 left-[12%] w-12 h-12 rounded-xl border ${dark ? 'border-indigo-800/30 bg-indigo-900/10' : 'border-indigo-200/50 bg-indigo-100/20'} hidden lg:block`}
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className={`absolute top-48 left-[8%] w-8 h-8 rounded-full ${dark ? 'bg-blue-700/20' : 'bg-blue-300/20'} hidden lg:block`}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-8 ${
              dark
                ? 'bg-blue-900/40 border border-blue-700/30 text-blue-300'
                : 'bg-blue-50 border border-blue-100 text-blue-700'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            {badge}
          </motion.div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] ${dark ? 'text-white' : 'text-gray-900'}`}
        >
          {title}
          {titleAccent && (
            <span className={dark
              ? 'text-blue-400'
              : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent'
            }>
              {titleAccent}
            </span>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className={`mt-6 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto ${dark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
