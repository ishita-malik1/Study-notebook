const { format, subDays } = require('date-fns');
const { getPracticeSessionsContainer } = require('./cosmosClient');
const { getHabitsInRange } = require('./habitsRepository');
const { getStreaks } = require('./streaksRepository');
const {
  getLearningProfile,
  defaultProfile,
} = require('./learningProfileRepository');

const LEVEL_RANK = { beginner: 0, intermediate: 1, advanced: 2 };

function mergeLearningProfiles(productProfile, tpmProfile) {
  const product = productProfile || defaultProfile('product');
  const tpm = tpmProfile || defaultProfile('tpm');

  const sessions_total =
    (product.sessions_total || 0) + (tpm.sessions_total || 0);

  const productLevel = product.current_level || product.difficulty || 'beginner';
  const tpmLevel = tpm.current_level || tpm.difficulty || 'beginner';
  const current_level =
    LEVEL_RANK[productLevel] >= LEVEL_RANK[tpmLevel] ? productLevel : tpmLevel;

  const primary =
    (product.sessions_total || 0) >= (tpm.sessions_total || 0) ? product : tpm;

  return {
    current_level,
    sessions_total,
    step_averages: primary.step_averages || {},
    weak_areas: [
      ...new Set([
        ...(product.weak_areas || []),
        ...(tpm.weak_areas || []),
      ]),
    ],
    strong_areas: [
      ...new Set([
        ...(product.strong_areas || []),
        ...(tpm.strong_areas || []),
      ]),
    ],
    sessions_at_current_level: primary.sessions_at_current_level || 0,
    product,
    tpm,
  };
}

async function getAllPracticeSessions() {
  const container = getPracticeSessionsContainer();
  const query = {
    query: 'SELECT * FROM c ORDER BY c.date ASC',
  };
  const { resources } = await container.items.query(query).fetchAll();
  return resources || [];
}

async function getProgressData() {
  const today = format(new Date(), 'yyyy-MM-dd');
  const from = format(subDays(new Date(), 89), 'yyyy-MM-dd');

  const [sessions, habits, streaks, productProfile, tpmProfile] =
    await Promise.all([
      getAllPracticeSessions(),
      getHabitsInRange(from, today),
      getStreaks(),
      getLearningProfile('product'),
      getLearningProfile('tpm'),
    ]);

  const learningProfile = mergeLearningProfiles(productProfile, tpmProfile);

  return {
    sessions,
    habits,
    streaks,
    learningProfile,
  };
}

module.exports = {
  getProgressData,
};
