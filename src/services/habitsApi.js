const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`);
  }

  return data;
}

export async function fetchHabitsForDate(date) {
  return request(`/habits?date=${encodeURIComponent(date)}`);
}

export async function fetchHabitsRange(from, to) {
  return request(
    `/habits?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
  );
}

export async function updateHabit(date, habitKey, value) {
  return request('/habits', {
    method: 'POST',
    body: JSON.stringify({ date, habitKey, value }),
  });
}

export async function fetchStreaks() {
  return request('/streaks');
}
