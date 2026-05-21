const { getLearningProfile } = require('../shared/learningProfileRepository');

module.exports = async function (context, req) {
  if (req.method !== 'GET') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const caseType = req.query?.type;
    if (!['product', 'tpm'].includes(caseType)) {
      context.res = {
        status: 400,
        body: { error: 'type query param must be product or tpm' },
      };
      return;
    }

    const profile = await getLearningProfile(caseType);
    context.res = { status: 200, body: profile };
  } catch (error) {
    context.log.error('learningProfile error:', error.message || error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Failed to load profile' },
    };
  }
};
