export const statusConfig = {
  Applied: {
    color: 'bg-white/[0.06] text-neutral-400 border-white/[0.08]',
    dot: 'bg-neutral-400',
  },
  Interviewing: {
    color: 'bg-white/[0.06] text-white border-white/[0.1]',
    dot: 'bg-white',
  },
  Offer: {
    color: 'bg-white/[0.06] text-white border-white/[0.1]',
    dot: 'bg-white',
  },
  Rejected: {
    color: 'bg-white/[0.06] text-neutral-500 border-white/[0.06]',
    dot: 'bg-neutral-500',
  },
};

export const getStatusConfig = (status) => {
  return statusConfig[status] || statusConfig.Applied;
};

import { format, parseISO, isValid } from 'date-fns';

export const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  try {
    const date = parseISO(dateStr);
    if (!isValid(date)) return '—';
    return format(date, 'MMM d, yyyy');
  } catch {
    return '—';
  }
};

export const formatSalary = (salary) => {
  if (!salary && salary !== 0) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(salary);
};
