import { format } from 'date-fns';

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

export function getLearningProfile(caseType) {
  if (getSessionCount(caseType) < 3) {
    return null;
  }
  return {
    weakSteps: [],
    recentProblemTypes: [],
  };
}
