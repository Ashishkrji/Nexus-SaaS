import { motion } from 'framer-motion';
import { Building2, Star, MapPin, TrendingUp } from 'lucide-react';

const stats = [
  { icon: Building2, value: '2,400+', label: 'Businesses Served', color: 'blue' },
  { icon: Star, value: '1.2M', label: 'Reviews Analyzed', color: 'yellow' },
  { icon: MapPin, value: '18,000+', label: 'Locations Managed', color: 'green' },
  { icon: TrendingUp, value: '47%', label: 'Avg Visibility Increase', color: 'purple' },
];

const colorClasses: Record<string, { bg: string; icon: string }> = {
  blue: { bg: 'bg-blue-50', icon: 'text-blue-600' },
  yellow: { bg: 'bg-yellow-50', icon: 'text-yellow-600' },
  green: { bg: 'bg-green-50', icon: 'text-green-600' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600' },
};

export default function Stats() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const colors = colorClasses[stat.color];
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
