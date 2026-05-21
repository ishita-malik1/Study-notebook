import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchStreaks } from '../services/habitsApi';

const StreaksContext = createContext(null);

export function StreaksProvider({ children }) {
  const [streaks, setStreaks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchStreaks();
      setStreaks(data);
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh().catch(() => {});
  }, [refresh]);

  const value = {
    streaks,
    loading,
    error,
    refresh,
    setStreaks,
  };

  return (
    <StreaksContext.Provider value={value}>{children}</StreaksContext.Provider>
  );
}

export function useStreaksContext() {
  const context = useContext(StreaksContext);
  if (!context) {
    throw new Error('useStreaksContext must be used within StreaksProvider');
  }
  return context;
}
