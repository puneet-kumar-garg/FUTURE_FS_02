import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Phone, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import type { DashboardStats } from '@/types/lead';

interface StatsCardsProps {
  stats: DashboardStats;
}

const cards = [
  { key: 'total' as const, label: 'Total Leads', icon: Users, color: 'primary', trend: '+12%' },
  { key: 'new' as const, label: 'New Leads', icon: Sparkles, color: 'info', trend: '+8%' },
  { key: 'contacted' as const, label: 'Contacted', icon: Phone, color: 'warning', trend: '+3%' },
  { key: 'converted' as const, label: 'Converted', icon: UserCheck, color: 'success', trend: '+24%' },
];

const colorClasses: Record<string, { bg: string; icon: string; glow: string }> = {
  primary: { bg: 'bg-primary/10', icon: 'text-primary', glow: 'shadow-[0_0_20px_hsl(var(--primary)/0.15)]' },
  info: { bg: 'bg-info/10', icon: 'text-info', glow: 'shadow-[0_0_20px_hsl(var(--info)/0.15)]' },
  warning: { bg: 'bg-warning/10', icon: 'text-warning', glow: 'shadow-[0_0_20px_hsl(var(--warning)/0.15)]' },
  success: { bg: 'bg-success/10', icon: 'text-success', glow: 'shadow-[0_0_20px_hsl(var(--success)/0.15)]' },
};

const StatsCards = ({ stats }: StatsCardsProps) => {
  const conversionRate = useMemo(() => {
    if (stats.total === 0) return '0';
    return ((stats.converted / stats.total) * 100).toFixed(1);
  }, [stats]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ key, label, icon: Icon, color, trend }, i) => {
          const c = colorClasses[color];
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:border-primary/30 ${c.glow}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
                  <p className="text-3xl font-extrabold tracking-tight text-card-foreground">{stats[key]}</p>
                  <div className="flex items-center gap-1 pt-1">
                    <TrendingUp className="h-3 w-3 text-success" />
                    <span className="text-xs font-medium text-success">{trend}</span>
                    <span className="text-xs text-muted-foreground">vs last month</span>
                  </div>
                </div>
                <div className={`rounded-xl p-3 ${c.bg} transition-transform duration-300 group-hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${c.icon}`} />
                </div>
              </div>
              {/* Decorative gradient bar */}
              <div className={`absolute bottom-0 left-0 h-0.5 w-full ${c.bg}`} />
            </motion.div>
          );
        })}
      </div>

      {/* Conversion rate bar */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        className="rounded-xl border border-border bg-card p-4 shadow-card"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">Conversion Rate</span>
          <span className="text-sm font-bold text-primary">{conversionRate}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full gradient-primary"
            initial={{ width: 0 }}
            animate={{ width: `${conversionRate}%` }}
            transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default StatsCards;
