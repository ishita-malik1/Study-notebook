const { getOpenAIClient } = require('./openaiClient');
const { FRAMEWORK_STEPS } = require('./caseFrameworkData');

function stepName(stepId) {
  const step = FRAMEWORK_STEPS.find((s) => s.id === stepId);
  return step?.name || stepId || 'your weakest framework step';
}

function buildSummaryPrompt(learningProfile, todaySession) {
  const weakId = learningProfile?.weak_areas?.[0];
  const weakName = stepName(weakId);
  const level = learningProfile?.current_level || 'beginner';
  const practiced = todaySession
    ? `Today they practiced a ${todaySession.type === 'tpm' ? 'TPM' : 'product'} case (score ${todaySession.scores?.overall ?? 'n/a'}).`
    : 'No practice session today.';

  return `You write one short sentence for a PM interview prep notebook.

${practiced}
Their current level: ${level}.
Weakest framework area: ${weakName}.

Write exactly one sentence starting with "Tomorrow, focus on" — give specific, actionable advice tied to that weak area. No quotes, no bullet points, under 25 words.`;
}

async function generateTomorrowFocus({ learningProfile, todaySession }) {
  const openai = getOpenAIClient();
  const deployment =
    process.env.AZURE_OPENAI_DEPLOYMENT_FAST ||
    process.env.AZURE_OPENAI_DEPLOYMENT ||
    'gpt-4o';

  const completion = await openai.chat.completions.create({
    model: deployment,
    temperature: 0.5,
    max_tokens: 100,
    messages: [
      {
        role: 'system',
        content:
          'You are a concise interview coach. Output only the single sentence requested.',
      },
      {
        role: 'user',
        content: buildSummaryPrompt(learningProfile, todaySession),
      },
    ],
  });

  const text = completion.choices?.[0]?.message?.content?.trim();
  if (!text) {
    const fallback = stepName(learningProfile?.weak_areas?.[0]);
    return `Tomorrow, focus on ${fallback} — take one extra pass before jumping to solutions.`;
  }

  return text.replace(/^["']|["']$/g, '');
}

module.exports = {
  generateTomorrowFocus,
  stepName,
};
