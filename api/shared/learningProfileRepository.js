const { getDatabase } = require('./cosmosClient');

const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'];
const STEP_KEYS = [
  'step1',
  'step2',
  'step3',
  'step4',
  'step5',
  'step6',
  'step7',
  'step8',
];

function profileId(caseType) {
  return `learning-profile-${caseType}`;
}

function defaultProfile(caseType) {
  const step_scores = {};
  const step_averages = {};
  STEP_KEYS.forEach((key) => {
    step_scores[key] = [];
    step_averages[key] = 0;
  });

  return {
    id: profileId(caseType),
    type: caseType,
    sessions_total: 0,
    difficulty: 'beginner',
    step_scores,
    step_averages,
    weak_areas: [],
    strong_areas: [],
    recentProblemTypes: [],
    recent_overall_scores: [],
  };
}

function getLearningProfileContainer() {
  return getDatabase().container('learning_profiles');
}

// Alias for consistency
function getLearningProfilesContainer() {
  return getLearningProfileContainer();
}

async function getLearningProfile(caseType) {
  const container = getLearningProfileContainer();
  const id = profileId(caseType);

  try {
    const { resource } = await container.item(id, id).read();
    return resource || defaultProfile(caseType);
  } catch (error) {
    if (error.code === 404) return defaultProfile(caseType);
    throw error;
  }
}

function appendScoreHistory(arr, value, max = 10) {
  const next = [...(arr || []), value];
  return next.slice(-max);
}

function calculateAverages(step_scores) {
  const averages = {};
  STEP_KEYS.forEach((key) => {
    const arr = step_scores[key] || [];
    averages[key] =
      arr.length > 0
        ? Math.round(
            (arr.reduce((a, b) => a + b, 0) / arr.length) * 10
          ) / 10
        : 0;
  });
  return averages;
}

function deriveAreas(step_averages) {
  const weak_areas = STEP_KEYS.filter((k) => step_averages[k] > 0 && step_averages[k] < 3);
  const strong_areas = STEP_KEYS.filter((k) => step_averages[k] >= 4);
  return { weak_areas, strong_areas };
}

function maybeEscalateDifficulty(profile, overallScore) {
  const recent = appendScoreHistory(
    profile.recent_overall_scores,
    overallScore,
    5
  );
  const avgRecent =
    recent.reduce((a, b) => a + b, 0) / recent.length;
  let difficulty = profile.difficulty || 'beginner';
  const idx = DIFFICULTY_LEVELS.indexOf(difficulty);

  if (avgRecent > 3.8 && idx < DIFFICULTY_LEVELS.length - 1) {
    difficulty = DIFFICULTY_LEVELS[idx + 1];
  }

  return { difficulty, recent_overall_scores: recent };
}

async function updateLearningProfileAfterSession(caseType, sessionResult) {
  const profile = await getLearningProfile(caseType);
  const { scores, feedback } = sessionResult;
  const problemType = sessionResult.caseMetadata?.problemType;

  STEP_KEYS.forEach((key) => {
    profile.step_scores[key] = appendScoreHistory(
      profile.step_scores[key],
      scores[key] ?? 0
    );
  });

  profile.step_averages = calculateAverages(profile.step_scores);
  const areas = deriveAreas(profile.step_averages);
  profile.weak_areas = areas.weak_areas;
  profile.strong_areas = areas.strong_areas;

  if (problemType) {
    profile.recentProblemTypes = [
      problemType,
      ...(profile.recentProblemTypes || []).filter((p) => p !== problemType),
    ].slice(0, 5);
  }

  const escalation = maybeEscalateDifficulty(profile, scores.overall);
  profile.difficulty = escalation.difficulty;
  profile.recent_overall_scores = escalation.recent_overall_scores;
  profile.sessions_total = (profile.sessions_total || 0) + 1;
  profile.last_feedback = feedback;
  profile.weakSteps = profile.weak_areas;
  profile.updatedAt = new Date().toISOString();

  const container = getLearningProfileContainer();
  const { resource } = await container.items.upsert(profile);
  return resource;
}

module.exports = {
  getLearningProfile,
  updateLearningProfileAfterSession,
  defaultProfile,
  profileId,
};
