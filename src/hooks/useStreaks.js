export function useStreaks() {
  return {
    streaks: [],
    loading: false,
    error: null,
    refresh: async () => {},
  };
}
