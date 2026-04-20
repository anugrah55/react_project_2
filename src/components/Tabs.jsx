import { motion } from 'framer-motion';

const tabs = [
  { label: 'All', value: 'All' },
  { label: 'Applied', value: 'Applied' },
  { label: 'Interviewing', value: 'Interviewing' },
  { label: 'Offer', value: 'Offer' },
  { label: 'Rejected', value: 'Rejected' },
  { label: 'Saved', value: 'Bookmarked' },
];

const Tabs = ({ activeTab, setActiveTab, counts }) => {
  return (
    <div className="flex items-center gap-1 border-b border-white/[0.06] overflow-x-auto">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        const count = counts?.[tab.value] ?? 0;

        return (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`relative px-4 py-3 text-[13px] font-medium whitespace-nowrap transition-colors ${
              isActive ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab.label}
              {count > 0 && (
                <span className={`text-[11px] tabular-nums ${isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  {count}
                </span>
              )}
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-white"
                transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
