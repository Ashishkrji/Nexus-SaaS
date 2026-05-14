"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Legal" title="Privacy " titleAccent="Policy" description="Last updated: May 14, 2026. This Privacy Policy describes how NexusSaaS collects, uses, and shares your personal information." />

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-blue max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">1. Introduction to NexusSaaS Privacy</h2>
            <p>
              At NexusSaaS ("we," "our," or "us"), we prioritize the security and privacy of your data. As a cloud infrastructure and AI deployment platform, we understand that you entrust us with your code, deployment logs, user data, and highly sensitive API keys. This policy outlines exactly what we collect, how it is secured, and how it is utilized to provide our service.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Information We Collect</h2>
            <p>
              We collect information to provide you with secure deployment environments and intelligent AI routing. The data we collect falls into the following categories:
            </p>
            <ul>
              <li><strong>Account & Billing Data:</strong> Name, email address, password hash, company name, and payment information (processed securely via Stripe or Razorpay).</li>
              <li><strong>Infrastructure & Telemetry Data:</strong> We collect deployment logs, build metrics, edge network latency statistics, and error traces to ensure high availability and SLA compliance (up to 99.99%).</li>
              <li><strong>AI Routing Metrics:</strong> When you use our Multi-Model AI Router, we log metadata such as the provider used (OpenAI, Anthropic, Gemini, Grok, NVIDIA), token counts, and latency. <strong>We do NOT log the contents of your prompts or AI responses unless you explicitly opt-in for debugging purposes.</strong></li>
              <li><strong>Third-Party API Keys:</strong> To facilitate AI routing, you may provide your own API keys. These are immediately encrypted at rest using AES-256-CBC and are only decrypted in-memory during active API requests.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. How We Use Your Information</h2>
            <p>
              Your data is exclusively used to operate, maintain, and enhance the NexusSaaS platform. Specifically, we use it to:
            </p>
            <ul>
              <li>Provision edge compute instances and manage your databases.</li>
              <li>Authenticate your requests to external AI providers via our secure proxy.</li>
              <li>Enforce subscription tier limits (e.g., API requests per month).</li>
              <li>Detect, prevent, and mitigate DDoS attacks or fraudulent activities.</li>
              <li>Send critical system alerts and deployment status notifications.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Data Sharing and Subprocessors</h2>
            <p>
              We never sell your data. We only share information with vetted third-party subprocessors essential to delivering our service. These include:
            </p>
            <ul>
              <li><strong>AWS & GCP:</strong> For underlying compute and database hosting.</li>
              <li><strong>Stripe & Razorpay:</strong> For secure payment processing.</li>
              <li><strong>AI Providers:</strong> When you execute an AI request, your prompt data is sent directly to the selected provider (e.g., OpenAI). Their respective privacy policies apply to how they handle that specific prompt data.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Data Retention and Deletion</h2>
            <p>
              We retain your account data for as long as your account is active. Deployment logs and telemetry data are automatically purged after 30 to 90 days, depending on your subscription tier. If you delete your account, all associated data, including encrypted API keys, is permanently destroyed within 7 days.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Your Rights</h2>
            <p>
              Depending on your location (e.g., under the <Link href="/gdpr" className="text-blue-600 hover:underline">GDPR</Link>), you have the right to access, correct, export, or delete your personal data. You can manage most of these actions directly from your Account Dashboard.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact our Data Protection Officer at <a href="mailto:privacy@nexussaas.com" className="text-blue-600 hover:underline">privacy@nexussaas.com</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
