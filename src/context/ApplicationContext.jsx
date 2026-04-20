import { createContext, useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchDummyJobs } from '../services/api';
import { toast } from 'react-toastify';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useLocalStorage('tracker_apps', []);
  const [loading, setLoading] = useState(false);
  const [initialized, setInitialized] = useLocalStorage('tracker_init', false);

  // Seed dummy data on first load
  useEffect(() => {
    if (!initialized && applications.length === 0) {
      setLoading(true);
      fetchDummyJobs().then((jobs) => {
        if (jobs.length > 0) {
          setApplications(jobs);
          setInitialized(true);
          toast.success(`Loaded ${jobs.length} sample applications!`);
        }
        setLoading(false);
      });
    }
  }, []);

  const addApplication = useCallback((app) => {
    const newApp = {
      ...app,
      id: crypto.randomUUID(),
      bookmarked: false,
    };
    setApplications((prev) => [newApp, ...prev]);
    toast.success('Application added successfully!');
    return newApp;
  }, [setApplications]);

  const updateApplication = useCallback((id, updates) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
    toast.success('Application updated!');
  }, [setApplications]);

  const deleteApplication = useCallback((id) => {
    setApplications((prev) => prev.filter((app) => app.id !== id));
    toast.info('Application removed.');
  }, [setApplications]);

  const toggleBookmark = useCallback((id) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, bookmarked: !app.bookmarked } : app
      )
    );
  }, [setApplications]);

  const getApplicationById = useCallback((id) => {
    return applications.find((app) => app.id === id);
  }, [applications]);

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        addApplication,
        updateApplication,
        deleteApplication,
        toggleBookmark,
        getApplicationById,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
