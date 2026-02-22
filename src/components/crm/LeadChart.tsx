import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import type { Lead } from '@/types/lead';

interface LeadChartProps {
  leads: Lead[];
}

const SOURCE_COLORS = [
  'hsl(173, 58%, 45%)',
  'hsl(210, 100%, 60%)',
  'hsl(38, 92%, 55%)',
  'hsl(152, 60%, 45%)',
  'hsl(262, 52%, 60%)',
  'hsl(0, 62%, 50%)',
];

const LeadChart = ({ leads }: LeadChartProps) => {
  const sourceData = useMemo(() => {
    const counts: Record<string, number> = {};
    leads.forEach(l => {
      counts[l.source] = (counts[l.source] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [leads]);

  const statusData = useMemo(() => [
    { name: 'New', value: leads.filter(l => l.status === 'New').length, color: 'hsl(210, 100%, 60%)' },
    { name: 'Contacted', value: leads.filter(l => l.status === 'Contacted').length, color: 'hsl(38, 92%, 55%)' },
    { name: 'Converted', value: leads.filter(l => l.status === 'Converted').length, color: 'hsl(152, 60%, 45%)' },
  ], [leads]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {/* Source Breakdown */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Lead Sources</h3>
        <div className="flex items-center gap-4">
          <div className="h-[140px] w-[140px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value" stroke="none">
                  {sourceData.map((_, i) => (
                    <Cell key={i} fill={SOURCE_COLORS[i % SOURCE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(225, 20%, 10%)', border: '1px solid hsl(225, 15%, 16%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 min-w-0">
            {sourceData.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: SOURCE_COLORS[i % SOURCE_COLORS.length] }} />
                <span className="text-muted-foreground truncate">{item.name}</span>
                <span className="ml-auto font-semibold text-card-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Status Breakdown */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-card">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">Pipeline Status</h3>
        <div className="flex items-center gap-4">
          <div className="h-[140px] w-[140px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value" stroke="none">
                  {statusData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(225, 20%, 10%)', border: '1px solid hsl(225, 15%, 16%)', borderRadius: '8px', color: 'hsl(220, 14%, 92%)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 min-w-0">
            {statusData.map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                    <span className="text-muted-foreground">{item.name}</span>
                  </div>
                  <span className="font-semibold text-card-foreground">{item.value}</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${leads.length ? (item.value / leads.length) * 100 : 0}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LeadChart;
