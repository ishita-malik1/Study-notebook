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

export async function generateCasePair({
  type,
  learningProfile = null,
  stepOverrides = null,
}) {
  return request('/generateCase', {
    method: 'POST',
    body: JSON.stringify({
      type,
      mode: 'walkthrough_pair',
      learningProfile,
      stepOverrides,
    }),
  });
}

export async function savePracticeSession(payload) {
  return request('/savePracticeSession', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
