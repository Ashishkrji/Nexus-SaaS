"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Shield, Lock, CheckCircle, Server } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Trust Center" title="Enterprise-Grade " titleAccent="Security" description="We treat your data, code, and API keys with the highest level of security. NexusSaaS is built securely from the ground up." />

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Shield, title: 'SOC 2 Type II', desc: 'Audited annually by independent third-party security firms.' },
              { icon: Lock, title: 'Encryption', desc: 'AES-256 encryption at rest. TLS 1.3 for all data in transit.' },
              { icon: Server, title: 'Edge Security', desc: 'Automated DDoS protection and WAF deployed at the edge.' },
              { icon: CheckCircle, title: 'Continuous Audits', desc: 'Daily vulnerability scanning and automated patch management.' }
            ].map(f => (
              <div key={f.title} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center">
                <f.icon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-blue max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Infrastructure Security</h2>
            <p>Our platform runs on top-tier cloud infrastructure providers (AWS and GCP), inheriting their physical and network security standards. Access to production systems is strictly limited to authorized engineers via VPN and hardware security keys.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">API Key Protection</h2>
            <p>When you provide custom API keys for OpenAI, Anthropic, Gemini, or Grok, they are immediately encrypted using AES-256-CBC before being stored in our database. We never log raw API keys, and they are only decrypted in-memory at the exact moment an AI completion request is made.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Vulnerability Disclosure</h2>
            <p>If you believe you have found a security vulnerability in NexusSaaS, please report it to <a href="mailto:security@nexussaas.com" className="text-blue-600">security@nexussaas.com</a>. We take all reports seriously and aim to resolve critical issues within 24 hours.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
