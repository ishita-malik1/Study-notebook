const { format, parseISO, isValid } = require('date-fns');
const { savePracticeSession } = require('../shared/sessionsRepository');

function isValidDateStr(dateStr) {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return false;
  }
  return isValid(parseISO(dateStr));
}

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const body = req.body || {};

    if (!['product', 'tpm'].includes(body.type)) {
      context.res = { status: 400, body: { error: 'type must be product or tpm' } };
      return;
    }

    if (!body.caseMetadata || !body.pairedPracticeCase) {
      context.res = {
        status: 400,
        body: { error: 'caseMetadata and pairedPracticeCase are required' },
      };
      return;
    }

    const date = body.date || format(new Date(), 'yyyy-MM-dd');
    if (!isValidDateStr(date)) {
      context.res = { status: 400, body: { error: 'Invalid date' } };
      return;
    }

    const saved = await savePracticeSession({
      id: body.id,
      date,
      type: body.type,
      mode: body.mode || 'walkthrough',
      caseMetadata: body.caseMetadata,
      pairedPracticeCase: body.pairedPracticeCase,
      conversation: body.conversation,
    });

    context.res = { status: 200, body: saved };
  } catch (error) {
    context.log.error('savePracticeSession error:', error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Failed to save session' },
    };
  }
};
