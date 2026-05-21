const { getPracticeSessionsContainer } = require('./cosmosClient');

const MAX_SESSIONS = 50;

/**
 * Review bank + session list: savedToReviewBank OR live mode, newest first, capped at 50.
 */
async function querySessions({ type, minScore, maxScore } = {}) {
  const container = getPracticeSessionsContainer();

  const conditions = [
    '(c.savedToReviewBank = true OR c.mode = "live")',
  ];
  const parameters = [];

  if (type === 'product' || type === 'tpm') {
    conditions.push('c.type = @type');
    parameters.push({ name: '@type', value: type });
  }

  if (minScore != null && minScore !== '') {
    const min = Number(minScore);
    if (!Number.isNaN(min)) {
      conditions.push('IS_DEFINED(c.scores.overall) AND c.scores.overall >= @minScore');
      parameters.push({ name: '@minScore', value: min });
    }
  }

  if (maxScore != null && maxScore !== '') {
    const max = Number(maxScore);
    if (!Number.isNaN(max)) {
      conditions.push('IS_DEFINED(c.scores.overall) AND c.scores.overall <= @maxScore');
      parameters.push({ name: '@maxScore', value: max });
    }
  }

  const query = {
    query: `SELECT TOP ${MAX_SESSIONS} * FROM c WHERE ${conditions.join(' AND ')} ORDER BY c.date DESC`,
    parameters,
  };

  const { resources } = await container.items.query(query).fetchAll();
  return resources || [];
}

module.exports = {
  querySessions,
  MAX_SESSIONS,
};
