const CASE_QUALITY_RULES = `
CASE QUALITY RULES — follow exactly:

A case must have four parts (combine into problemStatement AND also return as separate fields):

PART 1 — Company Profile (1-2 sentences)
- Company name, what they build, who they serve
- Their scale: specific numbers (MAU, registered users, revenue range)
- Business model: how they make money
- Market position: growing/mature/under pressure, key competitors

PART 2 — Situation Brief (1-2 sentences)
- What is happening RIGHT NOW with specific metrics
  (e.g. "30-day retention dropped from 68% to 54% over two quarters")
- How long this has been happening and when it started
- Any correlation with a recent event (launch, redesign, competitor move)
- What has already been tried and why it didn't work
- Why this matters to the business urgently (revenue impact, board pressure, etc.)

PART 3 — The Ask
- One sentence, framed as a real exec would say it
- Must be specific enough to be real, ambiguous enough to require clarification
- NOT: "How would you improve retention?"
- YES: "We're losing Pro subscribers at day 30 and I need to understand whether this is a product problem or an expectation problem before we commit engineering resources."

problemStatement must be the full narrative combining Parts 1-3 in polished prose (4-8 sentences total).

EXAMPLE OF A POOR CASE — never generate like this:
"Spotify is losing users. How would you fix retention?"

EXAMPLE OF A STRONG CASE — match this quality:
"Canva is a browser-based design tool with 150M registered users and 30M monthly actives. They monetize through Canva Pro at $13/month, which unlocks premium templates, brand kits, and team collaboration. They are growing rapidly in the SMB segment but face increasing pressure from Adobe Express and Figma's free tier expansion.

Over the last two quarters, 30-day retention for new Pro subscribers has dropped from 68% to 54%. This matters because Pro retention directly drives their $1.7B ARR. The drop correlates with a major template library redesign shipped in Q2. Customer support tickets tagged 'can't find templates' increased 3x in the same period. The growth team ran two re-engagement email campaigns — both saw under 2% reactivation.

Your VP of Product says: 'We're hemorrhaging Pro subscribers exactly 30 days after signup. I need to know if this is a product fit problem or an onboarding problem before we decide where to point engineering.'"
`;

const WALKTHROUGH_CONVERSATION_RULES = `
WALKTHROUGH CONVERSATION RULES:

Each candidate turn must have THREE layers:

1. thinking (internal monologue — what the candidate is reasoning through before they speak. This is the most important teaching element.)
2. says (what the candidate actually says out loud to the interviewer)
3. coachNote (one sentence explaining what skill or technique this moment demonstrates — written to the learner, not the candidate)

Each interviewer turn must use "content" field (NOT thinking/says/coachNote):
- Brief (1-2 sentences max)
- Neutral — never validating ("good point") or leading ("have you considered X")
- Either probing deeper OR transitioning naturally to the next area
- Occasionally pushing back to test conviction

THINKING layer rules:
- Write in first person, present tense: "I'm noticing that...", "The temptation here is to... but I should..."
- Show the candidate catching themselves before a mistake
- Show deliberate trade-off reasoning
- Show how they're using the framework without naming it explicitly
- Minimum 3-4 sentences per thinking block
- This is where the real learning happens — do not make it short

SAYS layer rules:
- Must sound like a real person speaking, not a textbook
- Specific — reference the case details, not generic PM language
- Shows structured thinking without sounding robotic
- Minimum 4-6 sentences for substantive steps (steps 2-7)
- Ends with either a signal that they're moving on OR an invitation for the interviewer to respond

COACH_NOTE rules:
- Written to the learner: "Notice how...", "The key move here is...", "Most candidates fail here by..."
- Explains WHY this moment matters in an interview context
- One pointed sentence, no padding

CONVERSATION LENGTH:
- Each of the 8 steps must have at minimum:
  - 1 interviewer opening message
  - 1 candidate response (with thinking, says, coachNote)
  - 1 interviewer follow-up or probe
  - 1 candidate response going deeper (with thinking, says, coachNote)
- Total conversation: minimum 25-30 exchanges
- Do not rush through steps — depth over speed

EXAMPLE OF A POOR CANDIDATE RESPONSE — never generate like this:
{
  "role": "candidate",
  "says": "I would want to understand the user segments first.",
  "stepId": "step2"
}

EXAMPLE OF A STRONG CANDIDATE RESPONSE — match this quality:
{
  "role": "candidate",
  "thinking": "The case mentions Pro subscribers dropping at day 30. My instinct is to immediately think about power users vs casual users, but that's too broad...",
  "says": "Before I go broad, I want to make sure I'm solving for the right user...",
  "coachNote": "Notice the candidate picks ONE segment and justifies the choice using case evidence.",
  "stepId": "step2",
  "stepName": "Define User & Pain Point"
}
`;

module.exports = {
  CASE_QUALITY_RULES,
  WALKTHROUGH_CONVERSATION_RULES,
};
