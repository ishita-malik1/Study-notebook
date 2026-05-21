import { useStreaksContext } from '../context/StreaksContext';

export function useStreaks() {
  const { streaks, loading, error, refresh, setStreaks } = useStreaksContext();

  return {
    streaks,
    loading,
    error,
    refresh,
    setStreaks,
  };
}
