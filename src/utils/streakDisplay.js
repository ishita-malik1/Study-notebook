import { HABIT_DEFINITIONS } from '../constants/habits';

export function getStripStreakSummary(streaks) {
  if (!streaks) return null;

  const active = HABIT_DEFINITIONS.map((habit) => ({
    label: habit.stripLabel,
    current: streaks[habit.streakKey]?.current ?? 0,
  }))
    .filter((item) => item.current > 0)
    .sort((a, b) => b.current - a.current);

  if (active.length === 0) {
    return 'No active streaks yet';
  }

  const shown = active.length <= 4 ? active : active.slice(0, 2);

  return shown
    .map((item) => `${item.label}: ${item.current} day${item.current === 1 ? '' : 's'}`)
    .join(' | ');
}
