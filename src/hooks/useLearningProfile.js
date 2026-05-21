export function useLearningProfile() {
  return {
    profile: null,
    loading: false,
    error: null,
    refresh: async () => {},
  };
}
