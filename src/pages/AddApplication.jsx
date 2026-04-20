import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import useApplications from '../hooks/useApplications';

const schema = yup.object().shape({
  company: yup.string().required('Required'),
  role: yup.string().required('Required'),
  location: yup.string(),
  salary: yup.number().typeError('Must be a number').positive('Must be positive').nullable().transform((_, val) => (val === '' || val === undefined ? null : Number(val))),
  platform: yup.string(),
  status: yup.string().required('Required'),
  appliedDate: yup.string().required('Required'),
  interviewDate: yup.string().nullable(),
  notes: yup.string(),
});

const statusOptions = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
const platformOptions = ['LinkedIn', 'Indeed', 'Company Website', 'Referral', 'AngelList', 'Glassdoor'];

const inputClasses = 'w-full bg-transparent border border-white/[0.08] text-white rounded-xl px-4 py-3 text-[14px] outline-none focus:border-white/[0.25] transition-all placeholder-neutral-700';
const labelClasses = 'block text-[11px] font-medium text-neutral-500 mb-2 uppercase tracking-widest';
const errorClasses = 'text-[11px] text-neutral-400 mt-1.5';

const AddApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addApplication, updateApplication, getApplicationById } = useApplications();
  const isEditing = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      company: '', role: '', location: '', salary: '',
      platform: 'LinkedIn', status: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      interviewDate: '', notes: '',
    },
  });

  useEffect(() => {
    if (isEditing) {
      const app = getApplicationById(id);
      if (app) {
        reset({
          company: app.company, role: app.role,
          location: app.location || '', salary: app.salary || '',
          platform: app.platform || 'LinkedIn', status: app.status,
          appliedDate: app.appliedDate, interviewDate: app.interviewDate || '',
          notes: app.notes || '',
        });
      }
    }
  }, [id, isEditing, getApplicationById, reset]);

  const onSubmit = (data) => {
    const appData = {
      ...data,
      salary: data.salary ? Number(data.salary) : 0,
      companyDomain: `${data.company.toLowerCase().replace(/\s+/g, '')}.com`,
    };
    if (isEditing) updateApplication(id, appData);
    else addApplication(appData);
    navigate('/applications');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-5 mb-12">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-neutral-600 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-[28px] font-semibold text-white tracking-tight">
            {isEditing ? 'Edit' : 'New Application'}
          </h1>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          {/* Company & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Company</label>
              <input {...register('company')} className={inputClasses} placeholder="Google" />
              {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Role</label>
              <input {...register('role')} className={inputClasses} placeholder="Frontend Developer" />
              {errors.role && <p className={errorClasses}>{errors.role.message}</p>}
            </div>
          </div>

          {/* Location & Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Location</label>
              <input {...register('location')} className={inputClasses} placeholder="Remote" />
            </div>
            <div>
              <label className={labelClasses}>Salary</label>
              <input {...register('salary')} type="number" className={inputClasses} placeholder="120000" />
              {errors.salary && <p className={errorClasses}>{errors.salary.message}</p>}
            </div>
          </div>

          {/* Platform & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Platform</label>
              <select {...register('platform')} className={inputClasses + ' cursor-pointer appearance-none'}>
                {platformOptions.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClasses}>Status</label>
              <select {...register('status')} className={inputClasses + ' cursor-pointer appearance-none'}>
                {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClasses}>Applied Date</label>
              <input {...register('appliedDate')} type="date" className={inputClasses + ' cursor-pointer'} />
              {errors.appliedDate && <p className={errorClasses}>{errors.appliedDate.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Interview Date</label>
              <input {...register('interviewDate')} type="date" className={inputClasses + ' cursor-pointer'} />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className={labelClasses}>Notes</label>
            <textarea
              {...register('notes')}
              rows={4}
              className={inputClasses + ' resize-none'}
              placeholder="Optional notes..."
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className="text-[14px] font-medium px-8 py-2.5 bg-white text-black rounded-full hover:bg-neutral-200 disabled:opacity-40 transition-colors"
          >
            {isEditing ? 'Update' : 'Save'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddApplication;
