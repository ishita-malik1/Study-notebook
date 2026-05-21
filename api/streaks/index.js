const { getStreaks, upsertStreaks } = require('../shared/streaksRepository');

module.exports = async function (context, req) {
  try {
    if (req.method === 'GET') {
      const streaks = await getStreaks();
      context.res = { status: 200, body: streaks };
      return;
    }

    if (req.method === 'POST') {
      const body = req.body;
      if (!body || typeof body !== 'object') {
        context.res = { status: 400, body: { error: 'Request body required' } };
        return;
      }

      const streaks = await upsertStreaks(body);
      context.res = { status: 200, body: streaks };
      return;
    }

    context.res = { status: 405, body: { error: 'Method not allowed' } };
  } catch (error) {
    context.log.error('streaks API error:', error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Internal server error' },
    };
  }
};
