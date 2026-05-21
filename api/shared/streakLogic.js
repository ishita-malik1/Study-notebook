const { format, parseISO, subDays, isValid } = require('date-fns');
const { STREAK_KEYS, defaultStreaksDocument } = require('./habitConstants');

function getYesterday(dateStr) {
  const parsed = parseISO(dateStr);
  if (!isValid(parsed)) {
    throw new Error(`Invalid date: ${dateStr}`);
  }
  return format(subDays(parsed, 1), 'yyyy-MM-dd');
}

/**
 * Apply streak rules when a habit is toggled.
 * @param {object} streaks - Full streaks document
 * @param {string} habitKey - Cosmos field (e.g. jobs_applied)
 * @param {boolean} value - New habit value for that date
 * @param {string} dateStr - YYYY-MM-DD (date at time of toggle)
 */
function applyStreakToggle(streaks, habitKey, value, dateStr, previousValue) {
  const streakKey = STREAK_KEYS[habitKey];
  if (!streakKey) {
    throw new Error(`Unknown habit key: ${habitKey}`);
  }

  const base = streaks || defaultStreaksDocument();
  const updated = JSON.parse(JSON.stringify(base));
  const entry = { ...updated[streakKey] };
  const yesterday = getYesterday(dateStr);

  if (value === true) {
    if (entry.lastCompleted === dateStr) {
      // Re-enabled same day after toggling off — restore increment
      if (previousValue === false) {
        entry.current = (entry.current || 0) + 1;
        if (entry.current > (entry.longest || 0)) {
          entry.longest = entry.current;
        }
      }
    } else if (entry.lastCompleted === yesterday) {
      entry.current = (entry.current || 0) + 1;
    } else {
      entry.current = 1;
    }

    if (entry.current > (entry.longest || 0)) {
      entry.longest = entry.current;
    }
    entry.lastCompleted = dateStr;
  } else {
    entry.current = Math.max(0, (entry.current || 0) - 1);
  }

  updated[streakKey] = entry;
  return updated;
}

module.exports = {
  applyStreakToggle,
  getYesterday,
};
