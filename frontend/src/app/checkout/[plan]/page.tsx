"use client";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Globe, ArrowRight, Check } from 'lucide-react';
import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage({ params }: { params: Promise<{ plan: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [region, setRegion] = useState<'india' | 'worldwide'>('worldwide');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const planName = resolvedParams.plan.charAt(0).toUpperCase() + resolvedParams.plan.slice(1);
  const price = planName === 'Pro' ? 29 : planName === 'Business' ? 79 : 0;
  
  // Dummy payment handler
  const handlePayment = () => {
    setLoading(true);
    // Simulate API call to Stripe/Razorpay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  if (price === 0 && planName !== 'Pro' && planName !== 'Business') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Invalid Plan</h2>
          <Link href="/pricing" className="text-blue-600 hover:underline">Return to Pricing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <Navbar />
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">Upgrade to NexusSaaS {planName}</h1>
            <p className="text-gray-600">Complete your secure checkout below.</p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            
            {/* Payment Details */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-3 space-y-6">
              
              {/* Region Selection */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" /> Select Your Region
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <button 
                    onClick={() => setRegion('india')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${region === 'india' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <p className="font-bold text-gray-900">India</p>
                    <p className="text-xs text-gray-500 mt-1">Processed via Razorpay (INR)</p>
                  </button>
                  <button 
                    onClick={() => setRegion('worldwide')}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${region === 'worldwide' ? 'border-blue-600 bg-blue-50' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <p className="font-bold text-gray-900">Worldwide</p>
                    <p className="text-xs text-gray-500 mt-1">Processed via Stripe/PayPal (USD)</p>
                  </button>
                </div>
              </div>

              {/* Payment Method Form */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                {success ? (
                  <div className="absolute inset-0 bg-green-500 flex flex-col items-center justify-center text-white z-10">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                      <Check className="w-8 h-8 text-green-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold">Payment Successful!</h3>
                    <p className="text-green-100 text-sm mt-2">Redirecting to your dashboard...</p>
                  </div>
                ) : null}

                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" /> Payment Details
                </h3>
                
                {region === 'worldwide' ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      🌍 Worldwide Checkout: You will be redirected to the secure <strong>Stripe Checkout</strong> portal to complete your payment via Credit Card, Apple Pay, or Google Pay.
                    </p>
                    <div className="flex gap-2 mb-6">
                      <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">VISA</div>
                      <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">MC</div>
                      <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">AMEX</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                      🇮🇳 India Checkout: You will be redirected to the secure <strong>Razorpay</strong> portal to complete your payment via UPI, NetBanking, or Credit/Debit Cards.
                    </p>
                    <div className="flex gap-2 mb-6">
                      <div className="h-8 w-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">UPI</div>
                      <div className="h-8 w-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">RUPAY</div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={handlePayment} 
                  disabled={loading || success}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-colors disabled:opacity-70"
                >
                  {loading ? 'Processing...' : region === 'worldwide' ? 'Pay with Stripe' : 'Pay with Razorpay'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Shield className="w-3.5 h-3.5" /> Payments are secure and encrypted.
                </div>
              </div>
            </motion.div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:col-span-2">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <p className="font-bold text-gray-900">NexusSaaS {planName}</p>
                    <p className="text-xs text-gray-500">Billed Monthly</p>
                  </div>
                  <p className="font-bold text-gray-900">${price}.00</p>
                </div>
                
                <div className="flex justify-between items-center mb-6 text-sm">
                  <p className="text-gray-500">Taxes</p>
                  <p className="text-gray-900">Calculated at checkout</p>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <p className="font-bold text-gray-900 text-lg">Total Due</p>
                  <p className="font-extrabold text-blue-600 text-2xl">${price}.00</p>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">What's included:</p>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> All 5 AI Providers included
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> {planName === 'Pro' ? '25,000' : '200,000'} API requests/mo
                  </div>
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> Priority Support
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
