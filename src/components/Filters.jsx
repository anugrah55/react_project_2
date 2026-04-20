import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const statusOptions = ['All', 'Applied', 'Interviewing', 'Offer', 'Rejected'];
const platformOptions = ['All', 'LinkedIn', 'Indeed', 'Company Website', 'Referral', 'AngelList', 'Glassdoor'];
const sortOptions = [
  { label: 'Newest', value: 'date-desc' },
  { label: 'Oldest', value: 'date-asc' },
  { label: 'Salary ↑', value: 'salary-desc' },
  { label: 'Salary ↓', value: 'salary-asc' },
  { label: 'A → Z', value: 'company-asc' },
  { label: 'Z → A', value: 'company-desc' },
];

const selectClasses = 'text-[13px] bg-white/[0.03] border border-white/[0.06] text-neutral-300 rounded-lg px-3 py-1.5 outline-none focus:border-white/[0.15] transition-all cursor-pointer appearance-none';
const labelClasses = 'text-[11px] text-neutral-600 font-medium uppercase tracking-widest';

const Filters = ({ filters, setFilters }) => {
  const { status, platform, sort, bookmarked } = filters;

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const hasActiveFilters = status !== 'All' || platform !== 'All' || bookmarked;

  const clearFilters = () => {
    setFilters({ status: 'All', platform: 'All', sort: 'date-desc', bookmarked: false });
  };

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <span className={labelClasses}>Status</span>
        <select value={status} onChange={(e) => updateFilter('status', e.target.value)} className={selectClasses}>
          {statusOptions.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className={labelClasses}>Platform</span>
        <select value={platform} onChange={(e) => updateFilter('platform', e.target.value)} className={selectClasses}>
          {platformOptions.map((p) => (<option key={p} value={p}>{p}</option>))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className={labelClasses}>Sort</span>
        <select value={sort} onChange={(e) => updateFilter('sort', e.target.value)} className={selectClasses}>
          {sortOptions.map((s) => (<option key={s.value} value={s.value}>{s.label}</option>))}
        </select>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => updateFilter('bookmarked', !bookmarked)}
        className={`text-[13px] px-3 py-1.5 rounded-lg border transition-all ${
          bookmarked
            ? 'bg-white text-black border-white'
            : 'bg-transparent text-neutral-500 border-white/[0.06] hover:border-white/[0.15]'
        }`}
      >
        ★ Saved
      </motion.button>

      {hasActiveFilters && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={clearFilters}
          className="flex items-center gap-1 text-[12px] text-neutral-600 hover:text-white transition-colors"
        >
          <FiX className="w-3 h-3" /> Clear
        </motion.button>
      )}
    </div>
  );
};

export default Filters;
