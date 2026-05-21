const FRAMEWORK_STEPS = [
  {
    id: 'step1',
    name: 'Clarify Objective',
    probeQuestions: [
      'What is the primary goal we are optimizing for?',
      'Who is the target user and what outcome do they need?',
      'What constraints or timeline should we assume?',
    ],
    strongSignals:
      'Restates the objective clearly and confirms success criteria.',
  },
  {
    id: 'step2',
    name: 'Define User & Pain Point',
    probeQuestions: [
      'Which user segment feels this pain most acutely?',
      'When and where does this problem show up in their journey?',
      'How do they cope with it today?',
    ],
    strongSignals:
      'Names a concrete segment with a specific, frequent pain point.',
  },
  {
    id: 'step3',
    name: 'Diagnose Root Cause',
    probeQuestions: [
      'What are the top hypotheses for why this happens?',
      'Which data would validate or invalidate each hypothesis?',
      'What is the most likely root cause given what we know?',
    ],
    strongSignals:
      'Uses a framework (e.g. 5 Whys) to isolate a plausible root cause.',
  },
  {
    id: 'step4',
    name: 'Prioritize Ruthlessly',
    probeQuestions: [
      'What options did you consider and why did you deprioritize others?',
      'What is the impact vs. effort tradeoff for your top choice?',
      'What would you ship in the next 90 days if you had to pick one?',
    ],
    strongSignals:
      'Explicitly ranks options with clear criteria and picks one focus.',
  },
  {
    id: 'step5',
    name: 'Design the Solution',
    probeQuestions: [
      'Walk me through the user flow for your proposed solution.',
      'What is the MVP scope vs. what you would defer?',
      'How does this solution map back to the pain point?',
    ],
    strongSignals:
      'Describes a clear MVP with user journey and key features.',
  },
  {
    id: 'step6',
    name: 'Define Success Metrics',
    probeQuestions: [
      'What is your north-star metric and why?',
      'What leading indicators would you watch in the first 30 days?',
      'What counter-metrics would you monitor for unintended harm?',
    ],
    strongSignals:
      'Ties metrics to the objective with primary and guardrail metrics.',
  },
  {
    id: 'step7',
    name: 'Discuss Risks & Tradeoffs',
    probeQuestions: [
      'What assumptions must hold for this to work?',
      'What are the biggest risks and how would you mitigate them?',
      'What tradeoffs are you accepting with this approach?',
    ],
    strongSignals:
      'Names key risks, mitigations, and honest tradeoffs.',
  },
  {
    id: 'step8',
    name: 'Make a Recommendation',
    probeQuestions: [
      'If you had to decide today, what would you recommend and why?',
      'What is the single next step you would take after this meeting?',
      'What would change your recommendation?',
    ],
    strongSignals:
      'Delivers a crisp recommendation with rationale and next actions.',
  },
];

const PROBLEM_TYPES = [
  'retention',
  'growth',
  'monetization',
  'marketplace',
  'platform',
  'new_product',
  'operational_efficiency',
];

const TPM_CASE_TYPES = [
  'launch_planning',
  'cross_functional_dependency',
  'incident_response',
  'build_vs_buy',
  'roadmap_prioritization',
  'stakeholder_alignment',
];

const DOMAINS = [
  'social_media',
  'fintech',
  'edtech',
  'healthtech',
  'saas_b2b',
  'marketplace',
  'consumer_app',
  'logistics',
  'gaming',
];

const TPM_STEP_OVERRIDES = [
  { id: 'step2', name: 'Identify Stakeholders & Dependencies' },
  { id: 'step5', name: 'Execution Plan with Milestones & Owners' },
  { id: 'step6', name: 'Launch Criteria & Rollback Triggers' },
];

function applyStepOverrides(steps, overrides = []) {
  if (!overrides.length) return steps;
  const overrideMap = Object.fromEntries(overrides.map((o) => [o.id, o]));
  return steps.map((step) => {
    const override = overrideMap[step.id];
    if (!override) return { ...step };
    return {
      ...step,
      name: override.name || step.name,
      description: override.description || step.description,
    };
  });
}

module.exports = {
  FRAMEWORK_STEPS,
  PROBLEM_TYPES,
  TPM_CASE_TYPES,
  DOMAINS,
  TPM_STEP_OVERRIDES,
  applyStepOverrides,
};
