import { format } from 'date-fns';
import { fetchLearningProfile } from '../services/interviewApi';

function todayKey() {
  return format(new Date(), 'yyyy-MM-dd');
}

export function hasWalkthroughToday(caseType) {
  return (
    localStorage.getItem(`sn_walkthrough_${caseType}_${todayKey()}`) === 'true'
  );
}

export function markWalkthroughToday(caseType) {
  localStorage.setItem(`sn_walkthrough_${caseType}_${todayKey()}`, 'true');
}

export function getSessionCount(caseType) {
  return parseInt(localStorage.getItem(`sn_${caseType}_sessions`) || '0', 10);
}

export function incrementSessionCount(caseType) {
  const next = getSessionCount(caseType) + 1;
  localStorage.setItem(`sn_${caseType}_sessions`, String(next));
  return next;
}

/** Profile for case generation — server applies adaptive rules; null = fallback */
export async function getLearningProfile(caseType) {
  try {
    const profile = await fetchLearningProfile(caseType);
    if (!profile?.exists) return null;
    return profile;
  } catch {
    return null;
  }
}

const DIAGNOSTIC_DONE_KEY = 'sn_diagnostic_done';

export function markDiagnosticDone() {
  localStorage.setItem(DIAGNOSTIC_DONE_KEY, 'true');
}

export async function needsDiagnostic(caseType) {
  // Once the user completes the diagnostic we cache it locally so we never
  // block the page on an API call again.
  if (localStorage.getItem(DIAGNOSTIC_DONE_KEY) === 'true') return false;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const profile = await fetchLearningProfile(caseType, controller.signal).finally(
      () => clearTimeout(timeout)
    );
    const needed = !profile?.exists || profile?.needsDiagnostic;
    if (!needed) markDiagnosticDone();
    return needed;
  } catch {
    // On any error (network, timeout, API down) don't block the page.
    return false;
  }
}
