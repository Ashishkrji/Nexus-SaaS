"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Download } from 'lucide-react';

export default function DPAPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Legal" title="Data Processing " titleAccent="Agreement" description="The DPA outlines our responsibilities as a data processor for your enterprise." />

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10 pb-10 border-b border-gray-100">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard DPA</h2>
                <p className="text-gray-600">Available for all users on Pro, Business, and Agency plans.</p>
              </div>
              <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex-shrink-0">
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>

            <div className="prose prose-blue max-w-none text-gray-600">
              <h3 className="text-xl font-bold text-gray-900">Summary of Terms</h3>
              <p>This Data Processing Agreement (DPA) reflects the parties' agreement with respect to the terms governing the processing of Personal Data under the NexusSaaS Terms of Service.</p>
              
              <h4 className="text-lg font-bold text-gray-900 mt-6">Subprocessors</h4>
              <p>NexusSaaS uses certain subprocessors to assist in providing the Services. A current list of subprocessors includes:</p>
              <ul>
                <li>Amazon Web Services (AWS) - Cloud Infrastructure</li>
                <li>MongoDB Atlas - Database Hosting</li>
                <li>OpenAI, Anthropic, Google - AI Model Providers (only if custom keys are not provided)</li>
              </ul>

              <h4 className="text-lg font-bold text-gray-900 mt-6">Data Transfer</h4>
              <p>We ensure that any transfer of personal data outside the EEA is protected by appropriate safeguards, primarily through the use of Standard Contractual Clauses (SCCs).</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
