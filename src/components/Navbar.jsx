import { Link, NavLink } from 'react-router-dom';
import { FiGrid, FiList, FiPlus, FiBarChart2 } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navLinkClass = ({ isActive }) =>
  `text-[13px] tracking-wide transition-colors ${
    isActive ? 'text-white' : 'text-neutral-500 hover:text-white'
  }`;

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link to="/dashboard" className="text-[15px] font-semibold tracking-tight text-white">
          JobTracker
        </Link>

        <div className="flex items-center gap-8">
          <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
          <NavLink to="/applications" className={navLinkClass}>Applications</NavLink>
          <NavLink to="/analytics" className={navLinkClass}>Analytics</NavLink>
          <Link to="/applications/new">
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.9)", borderColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.98 }}
              className="text-[13px] font-medium px-4 py-1.5 bg-white text-black rounded-full border border-transparent transition-all"
            >
              Add Job
            </motion.button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
