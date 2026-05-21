const { FRAMEWORK_STEPS } = require('./caseFrameworkData');

function buildScoringSystemPrompt(caseContext, hintUsed) {
  const stepsList = FRAMEWORK_STEPS.map(
    (s) => `${s.id}: ${s.name}`
  ).join('\n');

  return `You are an expert PM interview evaluator. Score the candidate's live case interview performance.

Framework steps:
${stepsList}

Score each step 1-5 (integer only):
1 = poor / missing depth
3 = adequate
5 = exceptional

Also determine:
- stepsCovered: array of step ids the candidate actually addressed (subset of step1-step8)
- band: "Weak" (overall < 2.0) | "Developing" (< 3.0) | "Strong" (< 4.0) | "Exceptional" (>= 4.0)
- overall: average of step scores to 1 decimal
${hintUsed ? '- The candidate used a hint during the session. Apply a 0.5 penalty to overall (minimum 1.0).' : ''}

Return ONLY valid JSON:
{
  "scores": { "step1": number, "step2": number, "step3": number, "step4": number, "step5": number, "step6": number, "step7": number, "step8": number, "overall": number },
  "band": string,
  "stepsCovered": string[],
  "feedback": {
    "strengths": [string, string, string],
    "improvements": [string, string, string],
    "keyLearnings": [string, string]
  }
}`;
}

function buildScoringUserPrompt(caseContext, conversationHistory) {
  const transcript = (conversationHistory || [])
    .map((m) => `${m.role === 'user' ? 'Candidate' : 'Interviewer'}: ${m.content}`)
    .join('\n\n');

  return `Case type: ${caseContext.type || 'product'}
Company: ${caseContext.company}
Domain: ${caseContext.domain}
Problem type: ${caseContext.problemType}
Problem: ${caseContext.problemStatement}

Interview transcript:
${transcript || '(no messages)'}`;
}

function normalizeEvaluation(parsed, hintUsed) {
  const scores = parsed.scores || {};
  const stepKeys = [
    'step1',
    'step2',
    'step3',
    'step4',
    'step5',
    'step6',
    'step7',
    'step8',
  ];

  stepKeys.forEach((key) => {
    if (typeof scores[key] !== 'number') scores[key] = 0;
    scores[key] = Math.max(0, Math.min(5, Math.round(scores[key])));
  });

  const numericSteps = stepKeys.map((k) => scores[k]);
  let overall =
    numericSteps.reduce((a, b) => a + b, 0) / numericSteps.length;
  if (hintUsed) overall = Math.max(1, overall - 0.5);
  overall = Math.round(overall * 10) / 10;
  scores.overall = overall;

  let band = parsed.band;
  if (!band) {
    if (overall < 2) band = 'Weak';
    else if (overall < 3) band = 'Developing';
    else if (overall < 4) band = 'Strong';
    else band = 'Exceptional';
  }

  return {
    sessionComplete: true,
    scores,
    band,
    stepsCovered: Array.isArray(parsed.stepsCovered)
      ? parsed.stepsCovered
      : [],
    feedback: {
      strengths: parsed.feedback?.strengths?.slice(0, 3) || [],
      improvements: parsed.feedback?.improvements?.slice(0, 3) || [],
      keyLearnings: parsed.feedback?.keyLearnings?.slice(0, 2) || [],
    },
  };
}

module.exports = {
  buildScoringSystemPrompt,
  buildScoringUserPrompt,
  normalizeEvaluation,
};
