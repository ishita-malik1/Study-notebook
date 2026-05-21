export const FRAMEWORK_STEPS = [
  {
    id: 'step1',
    name: 'Clarify Objective',
    description: 'Understand what success looks like and align on the core problem to solve.',
    probeQuestions: [
      'What is the primary goal we are optimizing for?',
      'Who is the target user and what outcome do they need?',
      'What constraints or timeline should we assume?',
    ],
    weakSignals: 'Jumps to solutions without defining goals or scope.',
    strongSignals: 'Restates the objective clearly and confirms success criteria.',
  },
  {
    id: 'step2',
    name: 'Define User & Pain Point',
    description: 'Identify the user segment and articulate the specific pain they experience.',
    probeQuestions: [
      'Which user segment feels this pain most acutely?',
      'When and where does this problem show up in their journey?',
      'How do they cope with it today?',
    ],
    weakSignals: 'Uses vague personas or generic pain without evidence.',
    strongSignals: 'Names a concrete segment with a specific, frequent pain point.',
  },
  {
    id: 'step3',
    name: 'Diagnose Root Cause',
    description: 'Break down why the pain exists using structured reasoning, not symptoms alone.',
    probeQuestions: [
      'What are the top hypotheses for why this happens?',
      'Which data would validate or invalidate each hypothesis?',
      'What is the most likely root cause given what we know?',
    ],
    weakSignals: 'Lists symptoms as causes without deeper analysis.',
    strongSignals: 'Uses a framework (e.g. 5 Whys) to isolate a plausible root cause.',
  },
  {
    id: 'step4',
    name: 'Prioritize Ruthlessly',
    description: 'Focus on the highest-impact lever given effort, risk, and time.',
    probeQuestions: [
      'What options did you consider and why did you deprioritize others?',
      'What is the impact vs. effort tradeoff for your top choice?',
      'What would you ship in the next 90 days if you had to pick one?',
    ],
    weakSignals: 'Tries to solve everything at once without ranking.',
    strongSignals: 'Explicitly ranks options with clear criteria and picks one focus.',
  },
  {
    id: 'step5',
    name: 'Design the Solution',
    description: 'Propose a concrete product approach that addresses the root cause.',
    probeQuestions: [
      'Walk me through the user flow for your proposed solution.',
      'What is the MVP scope vs. what you would defer?',
      'How does this solution map back to the pain point?',
    ],
    weakSignals: 'High-level buzzwords without user flow or feature detail.',
    strongSignals: 'Describes a clear MVP with user journey and key features.',
  },
  {
    id: 'step6',
    name: 'Define Success Metrics',
    description: 'Specify measurable outcomes and leading indicators for the solution.',
    probeQuestions: [
      'What is your north-star metric and why?',
      'What leading indicators would you watch in the first 30 days?',
      'What counter-metrics would you monitor for unintended harm?',
    ],
    weakSignals: 'Vanity metrics or metrics unrelated to the stated objective.',
    strongSignals: 'Ties metrics to the objective with primary and guardrail metrics.',
  },
  {
    id: 'step7',
    name: 'Discuss Risks & Tradeoffs',
    description: 'Surface assumptions, downsides, and what you are explicitly not doing.',
    probeQuestions: [
      'What assumptions must hold for this to work?',
      'What are the biggest risks and how would you mitigate them?',
      'What tradeoffs are you accepting with this approach?',
    ],
    weakSignals: 'Ignores risks or claims the solution has no downsides.',
    strongSignals: 'Names key risks, mitigations, and honest tradeoffs.',
  },
  {
    id: 'step8',
    name: 'Make a Recommendation',
    description: 'Synthesize the analysis into a clear, actionable recommendation.',
    probeQuestions: [
      'If you had to decide today, what would you recommend and why?',
      'What is the single next step you would take after this meeting?',
      'What would change your recommendation?',
    ],
    weakSignals: 'Ends without a clear decision or next steps.',
    strongSignals: 'Delivers a crisp recommendation with rationale and next actions.',
  },
];

export const PROBLEM_TYPES = [
  'retention',
  'growth',
  'monetization',
  'marketplace',
  'platform',
  'new_product',
  'operational_efficiency',
];

export const DOMAINS = [
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

export const TPM_CASE_TYPES = [
  'launch_planning',
  'cross_functional_dependency',
  'incident_response',
  'build_vs_buy',
  'roadmap_prioritization',
  'stakeholder_alignment',
];
