import { generateCasePair, savePracticeSession } from './caseApi';

export async function generateCase(params) {
  return generateCasePair(params);
}

export { savePracticeSession };

export async function evaluateSession() {
  throw new Error('Not implemented');
}

export async function generateSummary() {
  throw new Error('Not implemented');
}
