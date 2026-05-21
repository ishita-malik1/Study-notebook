const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns');
const { getPracticeSessionsContainer } = require('./cosmosClient');

async function savePracticeSession(session) {
  const container = getPracticeSessionsContainer();
  const id = session.id || uuidv4();
  const date = session.date || format(new Date(), 'yyyy-MM-dd');

  const document = {
    id,
    date,
    type: session.type,
    mode: session.mode || 'walkthrough',
    caseMetadata: session.caseMetadata,
    pairedPracticeCase: session.pairedPracticeCase,
    conversation: session.conversation || [],
    savedToReviewBank: true,
  };

  const { resource } = await container.items.upsert(document);
  return resource;
}

module.exports = {
  savePracticeSession,
};
