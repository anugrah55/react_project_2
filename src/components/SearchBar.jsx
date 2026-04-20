import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ value, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative flex items-center transition-all duration-300 ${focused ? 'w-full md:w-96' : 'w-full md:w-72'}`}>
      <div className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-xl border transition-all duration-200 ${
        focused
          ? 'bg-white/[0.04] border-white/[0.15]'
          : 'bg-white/[0.03] border-white/[0.06] hover:border-white/[0.1]'
      }`}>
        <FiSearch className={`w-4 h-4 flex-shrink-0 transition-colors ${focused ? 'text-white' : 'text-neutral-600'}`} />
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="bg-transparent w-full text-[14px] text-white placeholder-neutral-600 outline-none"
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => onChange('')}
              className="p-0.5 hover:bg-white/[0.06] rounded-full transition-colors"
            >
              <FiX className="w-3.5 h-3.5 text-neutral-500" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchBar;
