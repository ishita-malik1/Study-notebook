const { generateTomorrowFocus } = require('../shared/summaryService');

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const body = req.body || {};
    const { todayHabits, todaySession, learningProfile } = body;

    const tomorrowFocus = await generateTomorrowFocus({
      learningProfile: learningProfile || {},
      todaySession: todaySession || null,
      todayHabits,
    });

    context.res = {
      status: 200,
      body: { tomorrowFocus },
    };
  } catch (error) {
    context.log.error('generateSummary error:', error.message || error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Failed to generate summary' },
    };
  }
};
