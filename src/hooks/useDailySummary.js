import { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchHabitsForDate } from '../services/habitsApi';
import { fetchSessions } from '../services/sessionsApi';
import { fetchProgress } from '../services/progressApi';
import { generateTomorrowFocus } from '../services/summaryApi';
import {
  findTodayLiveSession,
  pickCumulativeReminders,
} from '../utils/dailySummaryUtils';

export function useDailySummary(open) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [todayHabits, setTodayHabits] = useState(null);
  const [todaySession, setTodaySession] = useState(null);
  const [learningProfile, setLearningProfile] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [tomorrowFocus, setTomorrowFocus] = useState('');
  const [focusLoading, setFocusLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const today = format(new Date(), 'yyyy-MM-dd');

    try {
      const [habits, sessions, progress] = await Promise.all([
        fetchHabitsForDate(today),
        fetchSessions(),
        fetchProgress(),
      ]);

      setTodayHabits(habits);
      const liveSession = findTodayLiveSession(sessions, today);
      setTodaySession(liveSession);
      const profile = progress?.learningProfile || {};
      setLearningProfile(profile);
      setReminders(
        pickCumulativeReminders(
          progress?.sessions || sessions,
          profile.weak_areas || []
        )
      );

      setFocusLoading(true);
      try {
        const focus = await generateTomorrowFocus({
          todayHabits: habits,
          todaySession: liveSession,
          learningProfile: profile,
        });
        setTomorrowFocus(focus);
      } catch (focusErr) {
        setTomorrowFocus(
          'Tomorrow, focus on your weakest framework step — slow down before proposing solutions.'
        );
        console.warn('generateSummary failed:', focusErr);
      } finally {
        setFocusLoading(false);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  return {
    loading,
    error,
    todayHabits,
    todaySession,
    learningProfile,
    reminders,
    tomorrowFocus,
    focusLoading,
    reload: load,
  };
}
