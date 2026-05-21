import { useCallback, useEffect, useMemo, useState } from 'react';
import PageHeading from '../components/layout/PageHeading';
import LoadingLine from '../components/layout/LoadingLine';
import ReviewFilterBar from '../components/review/ReviewFilterBar';
import ReviewSessionCard from '../components/review/ReviewSessionCard';
import ConversationModal from '../components/review/ConversationModal';
import { fetchSessions } from '../services/sessionsApi';

function applyClientFilter(sessions, filterId) {
  if (filterId === 'product') {
    return sessions.filter((s) => s.type === 'product');
  }
  if (filterId === 'tpm') {
    return sessions.filter((s) => s.type === 'tpm');
  }
  if (filterId === 'weak') {
    return sessions.filter(
      (s) => s.mode === 'live' && typeof s.scores?.overall === 'number' && s.scores.overall < 3
    );
  }
  if (filterId === 'strong') {
    return sessions.filter(
      (s) => s.mode === 'live' && typeof s.scores?.overall === 'number' && s.scores.overall >= 4
    );
  }
  return sessions;
}

export default function ReviewBank() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [conversationSession, setConversationSession] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchSessions();
      setSessions(data);
    } catch (err) {
      setError(err.message);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(
    () => applyClientFilter(sessions, filter),
    [sessions, filter]
  );

  return (
    <div className="review-bank-page pb-12">
      <PageHeading>Review Bank</PageHeading>

      <div className="mt-4 mb-6">
        <ReviewFilterBar active={filter} onChange={setFilter} />
      </div>

      {loading && (
        <div className="py-12">
          <LoadingLine />
        </div>
      )}

      {error && !loading && (
        <div className="error-sticky-note max-w-md">
          <p className="text-gray-800 mb-3">{error}</p>
          <button type="button" onClick={load} className="case-btn-primary text-sm">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="font-body text-gray-600 mt-8 text-center max-w-md mx-auto">
          No sessions saved yet — complete a practice case to build your review bank.
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="space-y-3">
          {filtered.map((session) => (
            <li key={session.id}>
              <ReviewSessionCard
                session={session}
                onViewConversation={setConversationSession}
              />
            </li>
          ))}
        </ul>
      )}

      {conversationSession && (
        <ConversationModal
          session={conversationSession}
          onClose={() => setConversationSession(null)}
        />
      )}
    </div>
  );
}
