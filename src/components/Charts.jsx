import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const COLORS = ['#ffffff', '#888888', '#555555', '#333333'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-neutral-900 border border-white/[0.08] rounded-xl px-3 py-2">
        <p className="text-[11px] text-neutral-500">{label || payload[0].name}</p>
        <p className="text-[14px] font-semibold text-white">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export const StatusPieChart = ({ data }) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="border border-white/10 rounded-2xl p-8 transition-all duration-300 bg-white/[0.01]"
    >
      <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">Status</h3>
      <p className="text-[12px] text-neutral-600 mb-6">Distribution by stage</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
            <span className="text-[12px] text-neutral-500">{entry.name}</span>
            <span className="text-[12px] font-medium text-neutral-300">{entry.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export const MonthlyBarChart = ({ data }) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="border border-white/10 rounded-2xl p-8 transition-all duration-300 bg-white/[0.01]"
    >
      <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">Monthly</h3>
      <p className="text-[12px] text-neutral-600 mb-6">Applications per month</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="count" fill="#ffffff" radius={[4, 4, 0, 0]} fillOpacity={0.8} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
};

export const SalaryAreaChart = ({ data }) => {
  return (
    <motion.div
      whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.3)" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.4 }}
      className="border border-white/10 rounded-2xl p-8 transition-all duration-300 bg-white/[0.01]"
    >
      <h3 className="text-[15px] font-semibold text-white tracking-tight mb-1">Salary</h3>
      <p className="text-[12px] text-neutral-600 mb-6">Range across applications</p>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="company" tick={{ fill: '#555', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#555', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} />
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="salary" stroke="#ffffff" strokeWidth={1.5} fill="url(#areaGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
};
