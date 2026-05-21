const { getProgressData } = require('../shared/progressRepository');

module.exports = async function (context, req) {
  if (req.method !== 'GET') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const data = await getProgressData();
    context.res = { status: 200, body: data };
  } catch (error) {
    context.log.error('getProgress error:', error.message || error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Failed to load progress data' },
    };
  }
};
