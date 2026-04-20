import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useApplications from '../hooks/useApplications';
import { StatusPieChart, MonthlyBarChart, SalaryAreaChart } from '../components/Charts';
import { format, parseISO, differenceInDays } from 'date-fns';

const InsightCard = ({ label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 group cursor-default"
  >
    <p className="text-[28px] font-semibold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">{value}</p>
    <p className="text-[12px] text-neutral-500 mt-2 tracking-wide font-medium">{label}</p>
  </motion.div>
);

const Analytics = () => {
  const { applications } = useApplications();

  const pieData = useMemo(() => {
    const counts = { Applied: 0, Interviewing: 0, Offer: 0, Rejected: 0 };
    applications.forEach(a => { if (counts[a.status] !== undefined) counts[a.status]++; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [applications]);

  const monthlyData = useMemo(() => {
    const map = {};
    applications.forEach(app => {
      if (app.appliedDate) {
        try {
          const month = format(parseISO(app.appliedDate), 'MMM yyyy');
          map[month] = (map[month] || 0) + 1;
        } catch {}
      }
    });
    return Object.entries(map).map(([month, count]) => ({ month, count })).sort((a, b) => new Date(a.month) - new Date(b.month)).slice(-6);
  }, [applications]);

  const salaryData = useMemo(() => {
    return applications.filter(a => a.salary > 0).sort((a, b) => a.salary - b.salary).slice(0, 15).map(a => ({ company: a.company, salary: a.salary }));
  }, [applications]);

  const insights = useMemo(() => {
    const total = applications.length;
    if (total === 0) return null;

    const offers = applications.filter(a => a.status === 'Offer').length;
    const interviews = applications.filter(a => a.status === 'Interviewing').length;
    const salaries = applications.filter(a => a.salary > 0);
    const avgSalary = salaries.reduce((acc, a) => acc + a.salary, 0) / (salaries.length || 1);

    const dates = applications.filter(a => a.appliedDate).map(a => parseISO(a.appliedDate));
    const spanDays = dates.length > 1 ? differenceInDays(new Date(Math.max(...dates)), new Date(Math.min(...dates))) : 0;
    const appsPerWeek = spanDays > 0 ? ((total / spanDays) * 7).toFixed(1) : total;

    const platformCounts = applications.reduce((acc, a) => {
      acc[a.platform] = (acc[a.platform] || 0) + 1;
      return acc;
    }, {});
    const bestPlatform = Object.entries(platformCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || '—';

    return {
      offerRate: total > 0 ? `${((offers / total) * 100).toFixed(0)}%` : '0%',
      interviewRate: total > 0 ? `${((interviews / total) * 100).toFixed(0)}%` : '0%',
      avgSalary: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(avgSalary),
      pace: appsPerWeek,
      bestPlatform,
      days: spanDays || 1,
    };
  }, [applications]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      <div>
        <h1 className="text-[34px] font-semibold text-white tracking-tight">Analytics</h1>
        <p className="text-[15px] text-neutral-500 mt-1">Performance insights.</p>
      </div>

      {insights && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <InsightCard label="Offer Rate" value={insights.offerRate} delay={0.05} />
          <InsightCard label="Interview Rate" value={insights.interviewRate} delay={0.1} />
          <InsightCard label="Avg Salary" value={insights.avgSalary} delay={0.15} />
          <InsightCard label="Apps / Week" value={insights.pace} delay={0.2} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusPieChart data={pieData} />
        <MonthlyBarChart data={monthlyData} />
      </div>

      <SalaryAreaChart data={salaryData} />

      {insights && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="border border-white/10 rounded-2xl p-8 text-center hover:border-white/30 transition-all duration-300 group cursor-default"
        >
          <p className="text-[13px] text-neutral-600 mb-1">Top Platform</p>
          <p className="text-[24px] font-semibold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">{insights.bestPlatform}</p>
          <p className="text-[12px] text-neutral-600 mt-1">{insights.days} days tracked</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Analytics;
