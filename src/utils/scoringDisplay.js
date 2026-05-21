import { FRAMEWORK_STEPS } from '../constants/caseFramework';

export const BAND_STYLES = {
  Weak: { color: '#ef4444', label: 'Weak' },
  Developing: { color: '#f59e0b', label: 'Developing' },
  Strong: { color: '#22c55e', label: 'Strong' },
  Exceptional: { color: '#6366f1', label: 'Exceptional' },
};

export function getBandStyle(band) {
  return BAND_STYLES[band] || BAND_STYLES.Developing;
}

export function scoreBarColor(score) {
  if (score >= 4) return '#22c55e';
  if (score >= 3) return '#f59e0b';
  if (score >= 2) return '#f97316';
  return '#ef4444';
}

export function formatProblemType(type) {
  if (!type) return '';
  return type
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export function sessionTitle(session) {
  const company = session.caseMetadata?.company || 'Case';
  const problem = formatProblemType(session.caseMetadata?.problemType);
  return problem ? `${company} — ${problem}` : company;
}
