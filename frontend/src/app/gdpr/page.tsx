"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function GDPRPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Legal" title="GDPR " titleAccent="Compliance" description="Our commitment to the General Data Protection Regulation and your privacy rights." />

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-blue max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">Our Commitment</h2>
            <p>NexusSaaS is fully committed to compliance with the General Data Protection Regulation (GDPR). We believe that the GDPR represents a significant step forward in data privacy and we have aligned our practices to meet these strict standards.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Data Processing</h2>
            <p>As a provider of cloud infrastructure and AI routing, NexusSaaS acts as both a Data Controller (for your account information) and a Data Processor (for the data you deploy or send through our APIs). We ensure that all processing is lawful, fair, and transparent.</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Your Rights</h2>
            <p>Under the GDPR, you have the right to:</p>
            <ul>
              <li>Request access to your personal data.</li>
              <li>Request correction of your personal data.</li>
              <li>Request erasure of your personal data (the "right to be forgotten").</li>
              <li>Object to processing of your personal data.</li>
              <li>Request restriction of processing your personal data.</li>
              <li>Request transfer of your personal data.</li>
              <li>Right to withdraw consent.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Data Protection Officer</h2>
            <p>If you wish to exercise any of these rights, or have questions about our GDPR compliance, please contact our Data Protection Officer at <a href="mailto:dpo@nexussaas.com" className="text-blue-600">dpo@nexussaas.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
