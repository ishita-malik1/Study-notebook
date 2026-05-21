const { generateWalkthroughPair } = require('../shared/caseGenerator');
const { TPM_STEP_OVERRIDES } = require('../shared/caseFrameworkData');

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const body = req.body || {};
    const { type, mode, learningProfile, stepOverrides } = body;

    if (!['product', 'tpm'].includes(type)) {
      context.res = { status: 400, body: { error: 'type must be product or tpm' } };
      return;
    }

    if (mode !== 'walkthrough_pair') {
      context.res = {
        status: 400,
        body: { error: 'Only walkthrough_pair mode is supported' },
      };
      return;
    }

    const overrides =
      stepOverrides ||
      (type === 'tpm' ? TPM_STEP_OVERRIDES : []);

    const profile =
      learningProfile && typeof learningProfile === 'object'
        ? learningProfile
        : null;

    const result = await generateWalkthroughPair({
      type,
      learningProfile: profile,
      stepOverrides: overrides,
      log: (msg, detail) => context.log.warn(msg, detail || ''),
    });

    context.res = { status: 200, body: result };
  } catch (error) {
    context.log.error('generateCase error:', error.message || error);
    context.res = {
      status: 500,
      body: {
        error: error.message || 'Failed to generate case',
        hint: 'Check API logs for validation details. Ensure deployment supports JSON mode and long outputs.',
      },
    };
  }
};
