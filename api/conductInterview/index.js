const {
  generateInterviewerReply,
  streamInterviewerReplySSE,
} = require('../shared/conductInterviewService');

module.exports = async function (context, req) {
  if (req.method !== 'POST') {
    context.res = { status: 405, body: { error: 'Method not allowed' } };
    return;
  }

  try {
    const body = req.body || {};
    const {
      caseContext,
      conversationHistory,
      learningProfile,
      action,
      stream,
    } = body;

    if (!caseContext?.problemStatement) {
      context.res = {
        status: 400,
        body: { error: 'caseContext with problemStatement is required' },
      };
      return;
    }

    if (action === 'end_session') {
      context.res = {
        status: 400,
        body: {
          error: 'Use POST /api/evaluateSession for scoring',
        },
      };
      return;
    }

    if (action && action !== 'next_message') {
      context.res = { status: 400, body: { error: 'Invalid action' } };
      return;
    }

    if (stream) {
      const sseBody = await streamInterviewerReplySSE({
        caseContext,
        conversationHistory: conversationHistory || [],
        learningProfile: learningProfile || null,
      });

      context.res = {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
        },
        body: sseBody,
      };
      return;
    }

    const result = await generateInterviewerReply({
      caseContext,
      conversationHistory: conversationHistory || [],
      learningProfile: learningProfile || null,
    });

    context.res = {
      status: 200,
      body: {
        message: result.message,
        sessionComplete: result.sessionComplete,
      },
    };
  } catch (error) {
    context.log.error('conductInterview error:', error.message || error);
    context.res = {
      status: 500,
      body: { error: error.message || 'Interview request failed' },
    };
  }
};
