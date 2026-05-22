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

Each candidate turn must have FOUR required fields:

1. thinking (internal monologue — continuous prose covering five implicit parts; see THINKING FIELD RULES)
2. commonSlip (one sentence — the specific mistake a weaker candidate makes at this step in THIS case; must be case-specific, not generic; mirrors the "temptation to avoid" in thinking but stands alone for the learner UI)
3. says (what the candidate actually says out loud to the interviewer)
4. coachNote (one sentence explaining what skill or technique this moment demonstrates — written to the learner, not the candidate)

Each interviewer turn must use "content" field (NOT thinking/commonSlip/says/coachNote):
- Brief (1-2 sentences max)
- Neutral — never validating ("good point") or leading ("have you considered X")
- Either probing deeper OR transitioning naturally to the next area
- Occasionally pushing back to test conviction

THINKING FIELD RULES — this is the most important field in the walkthrough:

The thinking block must cover five things in this order:

1. WHAT I NOTICE
   What in the case or the interviewer's question is actually worth paying
   attention to right now. What signal matters and why.
   Example: "The interviewer said retention is dropping but did not say
   at what point in the journey. That gap is intentional.
   I need to ask before I assume."

2. THE TEMPTATION TO AVOID
   What a weaker candidate would do at this exact moment.
   Be specific. Name the mistake, not just the category.
   Example: "The tempting move here is to immediately propose a
   re-engagement email campaign because it is fast and visible.
   But that is a solution looking for a problem. I have not
   diagnosed anything yet. If I go there now I am skipping
   two steps and it will show."

3. WHAT I AM CHOOSING AND WHY
   The deliberate decision the candidate makes and the reasoning behind it.
   Show the trade-off between two or more real options.
   Example: "I could ask about the metric trend over time or I could
   ask where in the funnel the drop is happening. Both are valid.
   I am going with funnel location first because it tells me
   whether this is an acquisition problem being mislabeled as
   retention, which would completely change the solution space."

4. WHAT I AM EXPLICITLY NOT DOING
   One or two things the candidate is consciously setting aside
   and why. These should be things that look reasonable on the surface.
   Example: "I am not asking about competitor activity right now
   even though it is a reasonable hypothesis. Bringing up
   external factors before I understand internal ones signals
   that I am looking for an excuse rather than a diagnosis."

5. HOW I AM GOING TO SAY IT
   A brief note on the communication choice, not just the content choice.
   Example: "I am going to phrase this as a question rather than
   a statement because I do not have enough information to assert
   anything yet. Framing it as curiosity rather than hypothesis
   keeps the door open."

LENGTH: Each thinking block must be a minimum of 6 to 8 sentences
across all five parts. Do not compress any part to one sentence.

TONE: First person, present tense. Active and specific.
No generic PM language. The thinking should sound like
a real person reasoning in real time, not a textbook.

WHAT TO AVOID IN THINKING BLOCKS:
- Generic observations like "I need to understand the user"
- Restating the framework step name
- Advice that would apply to any case
- Anything that sounds like a coach explaining theory

Every thought must be anchored to a specific detail in this case.

COMMON_SLIP field rules:
- Required on every candidate turn as "commonSlip"
- Exactly one sentence describing what a weaker candidate would do wrong at this moment in this case
- Must name the specific mistake (not "jumping to solutions" — say what solution they would propose and why it fails here)
- Must NOT repeat the thinking block verbatim — distill the temptation from part 2 into one sharp sentence
- Must be case-specific; never generic interview advice

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
  - 1 candidate response (with thinking, commonSlip, says, coachNote)
  - 1 interviewer follow-up or probe
  - 1 candidate response going deeper (with thinking, commonSlip, says, coachNote)
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
  "thinking": "The case mentions Pro subscribers dropping at day 30 — that number is specific enough to matter. I notice the VP framed this as product fit vs onboarding, which means they have not ruled out either path yet and I should not either. The temptation here is to immediately segment by power users vs casual users because it sounds rigorous, but that is too broad before I know where in the journey the drop happens. I am going to ask about the funnel location first rather than trend over time, because a timing misread would send me down the wrong solution space entirely. I am not bringing up competitor moves yet even though Adobe Express is in the brief — external factors before internal diagnosis reads like excuse-making. I will phrase this as a clarifying question, not a hypothesis, because I do not have enough signal to assert anything.",
  "commonSlip": "A weaker candidate would immediately split Canva Pro users into power vs casual segments before confirming where in the signup-to-day-30 journey the drop actually occurs.",
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
