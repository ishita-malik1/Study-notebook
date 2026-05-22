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

Each candidate turn must have FOUR required fields. Each field owns exactly ONE thing — no overlap.

FIELD DEFINITIONS — exclusive jobs:

"thinking" (Reasoning):
What decision did the candidate face at this moment, what options were genuinely available, and why did they choose this one over the others.
ONLY the decision and its reasoning. Sounds like a candidate at a fork in the road.
- Does NOT warn about mistakes
- Does NOT give tips
- Does NOT describe what others get wrong
- Minimum 4 sentences, first person, present tense
- Anchor to this case's specifics (metrics, ask, constraints) but stay inside the decision

"commonSlip" (Common Slip):
Exactly ONE sentence. The specific mistake most candidates make at this exact moment in this exact case.
- No advice. No reasoning. No "instead you should."
- Plain observation of the mistake only
- Case-specific: name what they wrongly do or ask (not "skip user definition")
- Must NOT repeat or paraphrase thinking

"says":
Exactly what the candidate said out loud. Spoken words only.
- No internal thought. No meta-commentary ("I am going to ask...")
- Reference case details naturally
- Minimum 2 sentences for substantive steps; 1 sentence ok for brief clarifications

"coachNote" (Interview Tip):
Exactly ONE sentence. One transferable technique this moment demonstrates.
- Applies to ANY PM interview — not this case or company
- Does NOT repeat thinking, commonSlip, or says
- No "Notice how the candidate..." — state the technique directly

VALIDATION — self-check before outputting each candidate turn:
- If thinking mentions a mistake or warns what weak candidates do → rewrite: decision and reasoning only
- If commonSlip contains advice or "instead" → rewrite: mistake observation only
- If coachNote references the company, product, or case facts → rewrite: universal technique only
- If any two fields say the same thing in different words → rewrite until each carries unique information

WRONG (redundant — never produce):
thinking: "I should not jump to solutions because that is what weak candidates do."
commonSlip: "Most candidates jump to solutions at this point."
coachNote: "Avoid jumping to solutions before diagnosing."

CORRECT (each field unique):
thinking: "I have two real options here. I can ask where in the funnel the drop is happening, or how long this has been going on. Both are legitimate first questions. I am choosing funnel location because it tells me whether this is actually a retention problem or an acquisition problem being mislabeled. If users are dropping on day 1, the retention framing is wrong and the entire conversation needs to shift."
commonSlip: "Most candidates hear 'retention is dropping' and immediately ask what features users are missing, skipping past the question of where in the journey the drop is actually happening."
says: "Before we get into causes, I want to understand the shape of the problem. Are we seeing users drop off in the first week, or is this happening after they have been active for a while?"
coachNote: "Asking a scoping question before forming any hypothesis signals structured thinking and buys you time to orient without appearing lost."

Each interviewer turn must use "content" field (NOT thinking/commonSlip/says/coachNote):
- Brief (1-2 sentences max)
- Neutral — never validating ("good point") or leading ("have you considered X")
- Either probing deeper OR transitioning naturally to the next area
- Occasionally pushing back to test conviction

CONVERSATION LENGTH:
- Each of the 8 steps must have at minimum:
  - 1 interviewer opening message
  - 1 candidate response (with thinking, commonSlip, says, coachNote)
  - 1 interviewer follow-up or probe
  - 1 candidate response going deeper (with thinking, commonSlip, says, coachNote)
- Total conversation: minimum 16 messages (8 candidate turns); aim for 24-32 with two exchanges per step
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
  "thinking": "I have two real options here. I can ask where in the funnel the drop is happening, or how long this has been going on. Both are legitimate first questions. I am choosing funnel location because it tells me whether this is actually a retention problem or an acquisition problem being mislabeled. If users are dropping on day 1, the retention framing is wrong and the entire conversation needs to shift.",
  "commonSlip": "Most candidates hear 'retention is dropping' and immediately ask what features users are missing, skipping past the question of where in the journey the drop is actually happening.",
  "says": "Before we get into causes, I want to understand the shape of the problem. Are we seeing users drop off in the first week, or is this happening after they have been active for a while? That changes what I would look at significantly.",
  "coachNote": "Asking a scoping question before forming any hypothesis signals structured thinking and buys you time to orient without appearing lost.",
  "stepId": "step2",
  "stepName": "Define User & Pain Point"
}
`;

module.exports = {
  CASE_QUALITY_RULES,
  WALKTHROUGH_CONVERSATION_RULES,
};
