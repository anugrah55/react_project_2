import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import useApplications from '../hooks/useApplications';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import Tabs from '../components/Tabs';
import JobCard from '../components/JobCard';

const Applications = () => {
  const { applications, loading, deleteApplication, toggleBookmark } = useApplications();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState({
    status: 'All',
    platform: 'All',
    sort: 'date-desc',
    bookmarked: false,
  });

  const debouncedSearch = useDebounce(searchQuery, 400);

  const tabCounts = useMemo(() => ({
    All: applications.length,
    Applied: applications.filter(a => a.status === 'Applied').length,
    Interviewing: applications.filter(a => a.status === 'Interviewing').length,
    Offer: applications.filter(a => a.status === 'Offer').length,
    Rejected: applications.filter(a => a.status === 'Rejected').length,
    Bookmarked: applications.filter(a => a.bookmarked).length,
  }), [applications]);

  const filteredApps = useMemo(() => {
    let result = [...applications];

    if (activeTab === 'Bookmarked') {
      result = result.filter(a => a.bookmarked);
    } else if (activeTab !== 'All') {
      result = result.filter(a => a.status === activeTab);
    }

    if (debouncedSearch) {
      const q = debouncedSearch.toLowerCase();
      result = result.filter(a =>
        a.company.toLowerCase().includes(q) ||
        a.role.toLowerCase().includes(q)
      );
    }

    if (filters.status !== 'All') result = result.filter(a => a.status === filters.status);
    if (filters.platform !== 'All') result = result.filter(a => a.platform === filters.platform);
    if (filters.bookmarked) result = result.filter(a => a.bookmarked);

    const [sortKey, sortDir] = filters.sort.split('-');
    result.sort((a, b) => {
      let c = 0;
      if (sortKey === 'date') c = new Date(a.appliedDate) - new Date(b.appliedDate);
      else if (sortKey === 'salary') c = (a.salary || 0) - (b.salary || 0);
      else if (sortKey === 'company') c = a.company.localeCompare(b.company);
      return sortDir === 'desc' ? -c : c;
    });

    return result;
  }, [applications, activeTab, debouncedSearch, filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-[34px] font-semibold text-white tracking-tight">Applications</h1>
          <p className="text-[15px] text-neutral-500 mt-1">
            {filteredApps.length} of {applications.length}
          </p>
        </div>
        <Link to="/applications/new">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-[13px] font-medium px-5 py-2 bg-white text-black rounded-full hover:bg-neutral-200 transition-colors"
          >
            Add Application
          </motion.button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} counts={tabCounts} />

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Cards */}
      {filteredApps.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
          <p className="text-[15px] text-neutral-500 mb-2">No applications found.</p>
          <p className="text-[13px] text-neutral-700">
            {searchQuery ? 'Try a different search.' : 'Add your first application to get started.'}
          </p>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredApps.map((app, i) => (
              <JobCard
                key={app.id}
                app={app}
                index={i}
                onDelete={deleteApplication}
                onToggleBookmark={toggleBookmark}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Applications;
