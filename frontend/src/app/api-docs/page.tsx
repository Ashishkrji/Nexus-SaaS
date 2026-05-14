"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { motion } from 'framer-motion';
import { Code, Terminal, Key, Database, BookOpen, Layers, Zap } from 'lucide-react';
import { useState } from 'react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState('authentication');

  const tabs = [
    { id: 'authentication', label: 'Authentication', icon: Key },
    { id: 'ai-completions', label: 'AI Completions', icon: Zap },
    { id: 'projects', label: 'Projects', icon: Layers },
    { id: 'deployments', label: 'Deployments', icon: Terminal },
    { id: 'webhooks', label: 'Webhooks', icon: Code },
  ];

  const codeExamples: Record<string, string> = {
    'authentication': `// Initialize the client with your API key
const { NexusClient } = require('@nexus/sdk');

const client = new NexusClient({
  apiKey: process.env.NEXUS_API_KEY
});

// Test authentication
const user = await client.auth.me();
console.log('Authenticated as:', user.email);`,
    'ai-completions': `// Run an AI completion with automatic routing
const response = await client.ai.complete({
  prompt: "Summarize the latest deployment logs",
  provider: "auto", // Automatically selects best provider
  model: "best"
});

console.log(response.result);
console.log('Provider used:', response.provider);`,
    'projects': `// List all projects in workspace
const projects = await client.projects.list({
  limit: 10,
  sortBy: 'updatedAt'
});

// Create a new project
const newProject = await client.projects.create({
  name: 'my-new-app',
  framework: 'nextjs',
  repository: 'github/username/my-new-app'
});`,
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero 
          badge="Documentation" 
          title="NexusSaaS " 
          titleAccent="API Reference" 
          description="Build custom integrations, automate your workflows, and interact programmatically with your workspace using our REST and GraphQL APIs." 
        />

        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Sidebar Navigation */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-64 flex-shrink-0 sticky top-24">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">API Reference</h3>
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      activeTab === tab.id 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    {tab.label}
                  </button>
                ))}
              </nav>

              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-8 mb-4 px-3">SDKs & Libraries</h3>
              <nav className="space-y-1">
                {['Node.js SDK', 'Python SDK', 'Go SDK', 'CLI Reference'].map((item) => (
                  <a key={item} href="#" className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all">
                    <BookOpen className="w-4 h-4 text-gray-400" /> {item}
                  </a>
                ))}
              </nav>
            </motion.div>

            {/* Content Area */}
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex-grow w-full">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-md">GET / POST</span>
                  <h2 className="text-2xl font-bold text-gray-900">{tabs.find(t => t.id === activeTab)?.label} Endpoint</h2>
                </div>
                
                <p className="text-gray-600 leading-relaxed mb-8">
                  Use this endpoint to interact with the {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} resources in your workspace. 
                  All API requests must be authenticated via a Bearer token in the Authorization header.
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-4">Code Example</h3>
                <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm text-gray-300 overflow-x-auto shadow-inner relative">
                  <button className="absolute top-4 right-4 px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold rounded-md transition-colors">
                    Copy
                  </button>
                  <pre><code>{codeExamples[activeTab] || '// Example coming soon'}</code></pre>
                </div>

                <h3 className="text-lg font-bold text-gray-900 mt-10 mb-4">Response Format</h3>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 font-mono text-sm text-gray-600 overflow-x-auto">
                  <pre><code>{`{
  "success": true,
  "data": { ... },
  "metadata": {
    "requestId": "req_123abc",
    "timestamp": "2026-05-14T12:00:00Z"
  }
}`}</code></pre>
                </div>
              </div>
            </motion.div>

          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
