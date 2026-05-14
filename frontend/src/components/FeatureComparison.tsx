import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

const comparisonData = [
  { feature: 'AI Review Analysis', free: 'basic', starter: 'full', pro: 'full', agency: 'full' },
  { feature: 'Auto Review Replies', free: '5/mo', starter: '50/mo', pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'GBP Post Scheduling', free: '3/mo', starter: '20/mo', pro: 'Unlimited', agency: 'Unlimited' },
  { feature: 'Local SEO Optimization', free: false, starter: true, pro: true, agency: true },
  { feature: 'Niche Keyword Rankings', free: false, starter: false, pro: true, agency: true },
  { feature: 'Sentiment Analysis', free: false, starter: true, pro: true, agency: true },
  { feature: 'White-Label Branding', free: false, starter: false, pro: false, agency: true },
  { feature: 'Multi-Location Management', free: false, starter: '3 locations', pro: '10 locations', agency: 'Unlimited' },
  { feature: 'AI Model', free: 'Nvidia Free', starter: 'Nvidia Free', pro: 'Premium AI', agency: 'Premium AI' },
  { feature: 'API Access', free: false, starter: false, pro: true, agency: true },
  { feature: 'Priority Support', free: false, starter: false, pro: true, agency: true },
  { feature: 'Custom Integrations', free: false, starter: false, pro: false, agency: true },
];

function CellValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="w-5 h-5 text-green-500 mx-auto" />;
  if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" />;
  return <span className="text-sm font-medium text-gray-700">{value}</span>;
}

export default function FeatureComparison() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6">
            Compare Plans
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight">
            Feature{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Comparison
            </span>
          </h2>
          <p className="mt-5 text-lg text-gray-600">
            See exactly what you get with each plan. No hidden fees, no surprises.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-6 py-5 text-sm font-semibold text-gray-900 bg-gray-50/50">Feature</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 bg-gray-50/50 text-center">Free</th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 bg-gray-50/50 text-center">Starter</th>
                  <th className="px-6 py-5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 text-center rounded-tl-2xl rounded-bl-2xl relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-[10px] font-bold rounded-full">POPULAR</span>
                    Pro
                  </th>
                  <th className="px-6 py-5 text-sm font-semibold text-gray-600 bg-gray-50/50 text-center">Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center"><CellValue value={row.free} /></td>
                    <td className="px-6 py-4 text-center"><CellValue value={row.starter} /></td>
                    <td className="px-6 py-4 text-center bg-blue-50/30"><CellValue value={row.pro} /></td>
                    <td className="px-6 py-4 text-center"><CellValue value={row.agency} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
