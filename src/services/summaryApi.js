const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function generateTomorrowFocus(payload) {
  const response = await fetch(`${API_BASE}/generateSummary`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data.tomorrowFocus || '';
}
