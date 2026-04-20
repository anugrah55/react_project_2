import { useMemo } from 'react';
import { motion } from 'framer-motion';
import useApplications from '../hooks/useApplications';
import { StatusPieChart, MonthlyBarChart, SalaryAreaChart } from '../components/Charts';
import { format, parseISO } from 'date-fns';

const StatCard = ({ label, value, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.06, duration: 0.4 }}
    className="border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all duration-300 group cursor-default"
  >
    <p className="text-[32px] font-semibold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">{value}</p>
    <p className="text-[12px] text-neutral-500 mt-2 tracking-wide font-medium">{label}</p>
  </motion.div>
);

const Dashboard = () => {
  const { applications, loading } = useApplications();

  const stats = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter(a => a.status === 'Applied').length;
    const interviewing = applications.filter(a => a.status === 'Interviewing').length;
    const offers = applications.filter(a => a.status === 'Offer').length;
    const rejected = applications.filter(a => a.status === 'Rejected').length;
    const bookmarked = applications.filter(a => a.bookmarked).length;
    return { total, applied, interviewing, offers, rejected, bookmarked };
  }, [applications]);

  const pieData = useMemo(() => [
    { name: 'Applied', value: stats.applied },
    { name: 'Interviewing', value: stats.interviewing },
    { name: 'Offer', value: stats.offers },
    { name: 'Rejected', value: stats.rejected },
  ], [stats]);

  const monthlyData = useMemo(() => {
    const monthMap = {};
    applications.forEach(app => {
      if (app.appliedDate) {
        try {
          const month = format(parseISO(app.appliedDate), 'MMM yyyy');
          monthMap[month] = (monthMap[month] || 0) + 1;
        } catch {}
      }
    });
    return Object.entries(monthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month) - new Date(b.month))
      .slice(-6);
  }, [applications]);

  const salaryData = useMemo(() => {
    return applications
      .filter(a => a.salary > 0)
      .sort((a, b) => a.salary - b.salary)
      .slice(0, 12)
      .map(a => ({ company: a.company, salary: a.salary }));
  }, [applications]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Total', value: stats.total },
    { label: 'Applied', value: stats.applied },
    { label: 'Interviewing', value: stats.interviewing },
    { label: 'Offers', value: stats.offers },
    { label: 'Rejected', value: stats.rejected },
    { label: 'Saved', value: stats.bookmarked },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {/* Header */}
      <div>
        <h1 className="text-[34px] font-semibold text-white tracking-tight">Dashboard</h1>
        <p className="text-[15px] text-neutral-500 mt-1">Your job search at a glance.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={card.label} {...card} index={i} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusPieChart data={pieData} />
        <MonthlyBarChart data={monthlyData} />
      </div>
      <SalaryAreaChart data={salaryData} />
    </motion.div>
  );
};

export default Dashboard;
