const { defaultHabitDocument, HABIT_FIELDS } = require('./habitConstants');
const { getHabitsContainer } = require('./cosmosClient');

async function getHabitByDate(date) {
  const container = getHabitsContainer();
  const id = `habit-${date}`;

  try {
    const { resource } = await container.item(id, id).read();
    return resource || defaultHabitDocument(date);
  } catch (error) {
    if (error.code === 404) {
      return defaultHabitDocument(date);
    }
    throw error;
  }
}

async function getHabitsInRange(from, to) {
  const container = getHabitsContainer();
  const query = {
    query:
      'SELECT * FROM c WHERE c.date >= @from AND c.date <= @to ORDER BY c.date',
    parameters: [
      { name: '@from', value: from },
      { name: '@to', value: to },
    ],
  };

  const { resources } = await container.items.query(query).fetchAll();
  return resources;
}

async function upsertHabit(date, habitKey, value) {
  if (!HABIT_FIELDS.includes(habitKey)) {
    throw new Error(`Invalid habit key: ${habitKey}`);
  }

  const existing = await getHabitByDate(date);
  const document = {
    ...existing,
    [habitKey]: Boolean(value),
  };

  const container = getHabitsContainer();
  const { resource } = await container.items.upsert(document);
  return resource;
}

module.exports = {
  getHabitByDate,
  getHabitsInRange,
  upsertHabit,
};
