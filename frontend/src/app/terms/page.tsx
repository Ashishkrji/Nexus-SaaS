"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <PageHero badge="Legal" title="Terms of " titleAccent="Service" description="Last updated: May 14, 2026. Please read these terms carefully before using the NexusSaaS platform." />

        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm prose prose-blue max-w-none text-gray-600">
            <h2 className="text-2xl font-bold text-gray-900 mt-0 mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing, registering for, or using the NexusSaaS platform, APIs, dashboard, and edge infrastructure (collectively, the "Service"), you agree to be bound by these Terms of Service. If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Description of Service</h2>
            <p>
              NexusSaaS provides a comprehensive cloud development platform. Features include, but are not limited to:
            </p>
            <ul>
              <li>Global edge compute deployments.</li>
              <li>A Multi-Model AI Router facilitating connections to third-party LLMs (OpenAI, Anthropic, Gemini, Grok, NVIDIA).</li>
              <li>Managed databases and real-time telemetry.</li>
              <li>No-code visual workflow automation.</li>
            </ul>
            <p>The specific features, SLA guarantees, and API limits available to you are dictated by your chosen Subscription Tier (Free, Pro, Business, or Agency).</p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. API Keys and Security</h2>
            <p>
              To use our AI routing features, you may be required to input your own third-party API keys. You grant NexusSaaS permission to encrypt, store, and utilize these keys strictly for the purpose of proxying your requests to those respective providers. You are solely responsible for all charges incurred on your third-party provider accounts.
            </p>
            <p>
              You must maintain the security of your NexusSaaS account credentials. You are responsible for all activities that occur under your account.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Acceptable Use Policy</h2>
            <p>
              You agree NOT to use the NexusSaaS platform to:
            </p>
            <ul>
              <li>Deploy applications that violate any applicable local, national, or international laws.</li>
              <li>Host or distribute malware, ransomware, or engage in unauthorized cryptomining.</li>
              <li>Launch DDoS attacks or intentionally attempt to degrade the performance of the NexusSaaS infrastructure.</li>
              <li>Bypass or attempt to bypass the API rate limits established by your subscription plan.</li>
              <li>Use the AI router to generate illegal, highly restricted, or abusive content in violation of the respective AI providers' terms of service.</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Payments, Upgrades, and Downgrades</h2>
            <p>
              A valid payment method (processed via Stripe or Razorpay) is required for paid plans. The Service is billed in advance on a monthly or annual basis and is non-refundable. If you upgrade your plan, you will be prorated the difference. If you downgrade, the new rate applies at the start of the next billing cycle. Downgrading may result in the loss of features or capacity (e.g., loss of custom domains or reduced API limits).
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Service Level Agreement (SLA)</h2>
            <p>
              NexusSaaS offers an uptime SLA for Business (99.95%) and Agency (99.99%) plans. If we fail to meet this SLA, you will be eligible for service credits as outlined in our SLA Addendum. The Free and Pro tiers are provided on a "commercially reasonable efforts" basis.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Termination</h2>
            <p>
              We reserve the right to suspend or terminate your access to the Service immediately, without prior notice or liability, if you breach any part of these Terms of Service. Upon termination, your right to use the Service will immediately cease.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
