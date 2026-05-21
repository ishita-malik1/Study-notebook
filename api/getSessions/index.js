const { querySessions } = require('../shared/sessionsQuery');

module.exports = async function (context, req) {
  if (req.method !== 'GET') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const { type, minScore, maxScore } = req.query || {};
    const sessions = await querySessions({ type, minScore, maxScore });
    context.res = { status: 200, body: { sessions } };
  } catch (error) {
    context.log.error('getSessions error:', error.message || error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Failed to load sessions' },
    };
  }
};
