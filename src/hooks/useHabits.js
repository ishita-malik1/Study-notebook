export function useHabits() {
  return {
    habits: [],
    loading: false,
    error: null,
    refresh: async () => {},
    toggleHabit: async () => {},
  };
}
