const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function fetchProgress() {
  const response = await fetch(`${API_BASE}/progress`);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data;
}
