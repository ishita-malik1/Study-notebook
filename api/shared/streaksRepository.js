const { defaultStreaksDocument } = require('./habitConstants');
const { getStreaksContainer } = require('./cosmosClient');

const STREAKS_ID = 'streaks-main';

async function getStreaks() {
  const container = getStreaksContainer();

  try {
    const { resource } = await container.item(STREAKS_ID, STREAKS_ID).read();
    return resource || defaultStreaksDocument();
  } catch (error) {
    if (error.code === 404) {
      return defaultStreaksDocument();
    }
    throw error;
  }
}

async function upsertStreaks(streaks) {
  const container = getStreaksContainer();
  const document = {
    ...defaultStreaksDocument(),
    ...streaks,
    id: STREAKS_ID,
  };
  const { resource } = await container.items.upsert(document);
  return resource;
}

module.exports = {
  getStreaks,
  upsertStreaks,
};
