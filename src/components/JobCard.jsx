import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiBookmark, FiMapPin, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { getCompanyLogo } from '../services/api';
import { formatDate, formatSalary, getStatusConfig } from '../utils/helpers';
import { Link } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98 },
};

const JobCard = ({ app, onDelete, onToggleBookmark, index }) => {
  const sc = getStatusConfig(app.status);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ y: -4, borderColor: "rgba(255, 255, 255, 0.3)" }}
      transition={{ 
        delay: index * 0.03, 
        duration: 0.25,
        borderColor: { duration: 0.2 }
      }}
      layout
      className="group border border-white/10 rounded-2xl p-6 transition-all duration-300 bg-white/[0.01]"
    >
      {/* Top: Company + Status */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/[0.06] flex items-center justify-center overflow-hidden flex-shrink-0">
            <img
              src={getCompanyLogo(app.companyDomain || `${app.company.toLowerCase().replace(/\s+/g, '')}.com`)}
              alt={app.company}
              className="w-full h-full object-contain p-1.5 invert brightness-200"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="hidden w-full h-full items-center justify-center text-[15px] font-semibold text-neutral-400">
              {app.company.charAt(0)}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-white tracking-tight truncate">{app.company}</h3>
            <p className="text-[13px] text-neutral-500 truncate">{app.role}</p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-full border ${sc.color}`}>
          <span className={`w-1 h-1 rounded-full ${sc.dot}`} />
          {app.status}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
        {app.location && (
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            <FiMapPin className="w-3 h-3 flex-shrink-0 text-neutral-600" />
            <span className="truncate">{app.location}</span>
          </div>
        )}
        {app.salary > 0 && (
          <div className="flex items-center gap-2 text-[12px] text-neutral-500">
            <FiDollarSign className="w-3 h-3 flex-shrink-0 text-neutral-600" />
            <span>{formatSalary(app.salary)}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-[12px] text-neutral-500">
          <FiCalendar className="w-3 h-3 flex-shrink-0 text-neutral-600" />
          <span>{formatDate(app.appliedDate)}</span>
        </div>
        {app.platform && (
          <div className="text-[12px] text-neutral-600 truncate">{app.platform}</div>
        )}
      </div>

      {/* Interview */}
      {app.interviewDate && (
        <div className="mb-5 px-3.5 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl">
          <p className="text-[12px] text-neutral-400">
            Interview · {formatDate(app.interviewDate)}
          </p>
        </div>
      )}

      {/* Notes */}
      {app.notes && (
        <p className="text-[12px] text-neutral-600 mb-5 line-clamp-2 leading-relaxed">{app.notes}</p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
        <div className="flex items-center gap-1">
          <Link to={`/applications/${app.id}`}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-neutral-600 hover:text-white rounded-lg transition-colors"
            >
              <FiEdit2 className="w-3.5 h-3.5" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(app.id)}
            className="p-2 text-neutral-600 hover:text-white rounded-lg transition-colors"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </motion.button>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleBookmark(app.id)}
          className={`p-2 rounded-lg transition-colors ${
            app.bookmarked ? 'text-white' : 'text-neutral-600 hover:text-white'
          }`}
        >
          <FiBookmark className="w-3.5 h-3.5" fill={app.bookmarked ? 'currentColor' : 'none'} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default JobCard;
