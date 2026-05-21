const { format, parseISO, isValid } = require('date-fns');
const {
  getHabitByDate,
  getHabitsInRange,
  upsertHabit,
} = require('../shared/habitsRepository');
const { getStreaks, upsertStreaks } = require('../shared/streaksRepository');
const { applyStreakToggle } = require('../shared/streakLogic');
const { HABIT_FIELDS } = require('../shared/habitConstants');

function isValidDateStr(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  return isValid(parseISO(dateStr));
}

module.exports = async function (context, req) {
  try {
    if (req.method === 'GET') {
      const { date, from, to } = req.query || {};

      if (from && to) {
        if (!isValidDateStr(from) || !isValidDateStr(to)) {
          context.res = { status: 400, body: { error: 'Invalid from or to date' } };
          return;
        }
        const habits = await getHabitsInRange(from, to);
        context.res = { status: 200, body: habits };
        return;
      }

      const targetDate = date || format(new Date(), 'yyyy-MM-dd');
      if (!isValidDateStr(targetDate)) {
        context.res = { status: 400, body: { error: 'Invalid date' } };
        return;
      }

      const habit = await getHabitByDate(targetDate);
      context.res = { status: 200, body: habit };
      return;
    }

    if (req.method === 'POST') {
      const body = req.body || {};
      const { date, habitKey, value } = body;

      if (!isValidDateStr(date)) {
        context.res = { status: 400, body: { error: 'Invalid date' } };
        return;
      }

      if (!HABIT_FIELDS.includes(habitKey)) {
        context.res = { status: 400, body: { error: 'Invalid habitKey' } };
        return;
      }

      if (typeof value !== 'boolean') {
        context.res = { status: 400, body: { error: 'value must be a boolean' } };
        return;
      }

      if (value === false) {
        context.res = {
          status: 400,
          body: { error: 'Habits cannot be unchecked once completed' },
        };
        return;
      }

      const existing = await getHabitByDate(date);
      const previousValue = Boolean(existing[habitKey]);
      const habit = await upsertHabit(date, habitKey, value);
      const currentStreaks = await getStreaks();
      const updatedStreaks = applyStreakToggle(
        currentStreaks,
        habitKey,
        value,
        date,
        previousValue
      );
      const streaks = await upsertStreaks(updatedStreaks);

      context.res = {
        status: 200,
        body: { habit, streaks },
      };
      return;
    }

    context.res = { status: 405, body: { error: 'Method not allowed' } };
  } catch (error) {
    context.log.error('habits API error:', error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Internal server error' },
    };
  }
};
