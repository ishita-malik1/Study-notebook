const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchSessions(filters = {}) {
  const params = new URLSearchParams();
  if (filters.type) params.set('type', filters.type);
  if (filters.minScore != null) params.set('minScore', String(filters.minScore));
  if (filters.maxScore != null) params.set('maxScore', String(filters.maxScore));

  const qs = params.toString();
  const response = await fetch(`${API_BASE}/sessions${qs ? `?${qs}` : ''}`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data.sessions || [];
}
