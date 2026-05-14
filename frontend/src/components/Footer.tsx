"use client";

import Link from 'next/link';
import { Zap, Send, Briefcase, Code, Video } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">Nexus<span className="text-blue-400">SaaS</span></span>
            </Link>
            <p className="text-sm text-gray-500 hidden sm:block">|</p>
            <p className="text-sm text-gray-500">© 2026 NexusSaaS Inc. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-3">
            {[Send, Briefcase, Code, Video].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
