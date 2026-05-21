const { getOpenAIClient } = require('./openaiClient');
const {
  buildInterviewerSystemPrompt,
  buildInterviewerMessages,
} = require('./interviewerPrompt');

const OPENER = 'Tell me — how would you approach this problem?';

async function generateInterviewerReply({
  caseContext,
  conversationHistory,
  learningProfile,
}) {
  const openai = getOpenAIClient();
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
  const history = conversationHistory || [];

  if (history.length === 0) {
    return { message: OPENER, sessionComplete: false };
  }

  const lastUser = [...history].reverse().find((m) => m.role === 'user');
  if (lastUser?.content?.trim().split(/\s+/).length < 10) {
    return {
      message: 'Can you say more about that?',
      sessionComplete: false,
    };
  }

  const guidancePatterns = [
    /on the right track/i,
    /am i doing/i,
    /should i/i,
    /is this correct/i,
    /give me a hint/i,
    /what step/i,
  ];
  if (guidancePatterns.some((p) => p.test(lastUser.content))) {
    return {
      message: "I can't guide you during the interview — keep going.",
      sessionComplete: false,
    };
  }

  const systemPrompt = buildInterviewerSystemPrompt(
    caseContext,
    learningProfile
  );
  const messages = [
    { role: 'system', content: systemPrompt },
    ...buildInterviewerMessages(history),
  ];

  const completion = await openai.chat.completions.create({
    model: deployment,
    temperature: 0.3,
    max_tokens: 300,
    messages,
  });

  const message =
    completion.choices?.[0]?.message?.content?.trim() ||
    'Can you elaborate on that?';

  const donePatterns = [
    /that concludes/i,
    /we're out of time/i,
    /thank you for your time/i,
    /we'll be in touch/i,
  ];
  const sessionComplete = donePatterns.some((p) => p.test(message));

  return { message, sessionComplete };
}

async function generateInterviewerReplyStream({
  caseContext,
  conversationHistory,
  learningProfile,
}) {
  const history = conversationHistory || [];

  if (history.length === 0) {
    return { events: [{ delta: OPENER }, { done: true, sessionComplete: false }] };
  }

  const nonStream = await generateInterviewerReply({
    caseContext,
    conversationHistory,
    learningProfile,
  });

  return {
    events: [
      { delta: nonStream.message },
      { done: true, sessionComplete: nonStream.sessionComplete },
    ],
  };
}

async function streamInterviewerReplySSE({
  caseContext,
  conversationHistory,
  learningProfile,
}) {
  const openai = getOpenAIClient();
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';
  const history = conversationHistory || [];

  if (history.length === 0) {
    return `data: ${JSON.stringify({ delta: OPENER })}\n\ndata: ${JSON.stringify({ done: true, sessionComplete: false })}\n\n`;
  }

  const quick = await generateInterviewerReply({
    caseContext,
    conversationHistory,
    learningProfile,
  });

  let sse = '';
  const words = quick.message.split(/(\s+)/);
  for (const word of words) {
    if (word) {
      sse += `data: ${JSON.stringify({ delta: word })}\n\n`;
    }
  }
  sse += `data: ${JSON.stringify({ done: true, sessionComplete: quick.sessionComplete })}\n\n`;
  return sse;
}

module.exports = {
  generateInterviewerReply,
  generateInterviewerReplyStream,
  streamInterviewerReplySSE,
};
