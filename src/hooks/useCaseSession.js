import { useCallback, useState } from 'react';
import { format } from 'date-fns';
import { generateCasePair, savePracticeSession } from '../services/caseApi';
import { TPM_STEP_OVERRIDES } from '../constants/caseFramework';
import {
  getLearningProfile,
  hasWalkthroughToday,
  incrementSessionCount,
  markWalkthroughToday,
} from '../utils/caseSessionStorage';

export function useCaseSession(caseType) {
  const [view, setView] = useState('landing');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walkthroughCase, setWalkthroughCase] = useState(null);
  const [practiceCase, setPracticeCase] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [walkthroughDoneToday, setWalkthroughDoneToday] = useState(() =>
    hasWalkthroughToday(caseType)
  );

  const stepOverrides = caseType === 'tpm' ? TPM_STEP_OVERRIDES : null;

  const startWalkthrough = useCallback(async () => {
    setView('walkthrough');
    setLoading(true);
    setError(null);
    setWalkthroughCase(null);
    setPracticeCase(null);
    setSaved(false);

    try {
      const learningProfile = getLearningProfile(caseType);
      const result = await generateCasePair({
        type: caseType,
        learningProfile,
        stepOverrides,
      });

      setWalkthroughCase(result.walkthroughCase);
      setPracticeCase(result.practiceCase);
      incrementSessionCount(caseType);
      markWalkthroughToday(caseType);
      setWalkthroughDoneToday(true);
    } catch (err) {
      setError(err.message || 'Failed to generate case');
    } finally {
      setLoading(false);
    }
  }, [caseType, stepOverrides]);

  const retryGenerate = useCallback(() => {
    startWalkthrough();
  }, [startWalkthrough]);

  const goToLanding = useCallback(() => {
    setView('landing');
    setError(null);
  }, []);

  const skipToPractice = useCallback(() => {
    setView('practice');
  }, []);

  const startPractice = useCallback(() => {
    setView('practice');
  }, []);

  const saveToReviewBank = useCallback(async () => {
    if (!walkthroughCase || !practiceCase) return;

    setSaving(true);
    try {
      await savePracticeSession({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: caseType,
        mode: 'walkthrough',
        caseMetadata: {
          problemType: walkthroughCase.problemType,
          company: walkthroughCase.company,
          domain: walkthroughCase.domain,
          problemStatement: walkthroughCase.problemStatement,
          companyProfile: walkthroughCase.companyProfile,
          situationBrief: walkthroughCase.situationBrief,
          theAsk: walkthroughCase.theAsk,
        },
        pairedPracticeCase: {
          problemType: practiceCase.problemType,
          company: practiceCase.company,
          domain: practiceCase.domain,
          problemStatement: practiceCase.problemStatement,
          companyProfile: practiceCase.companyProfile,
          situationBrief: practiceCase.situationBrief,
          theAsk: practiceCase.theAsk,
        },
        conversation: walkthroughCase.conversation,
      });
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Failed to save session');
    } finally {
      setSaving(false);
    }
  }, [walkthroughCase, practiceCase, caseType]);

  return {
    view,
    loading,
    error,
    walkthroughCase,
    practiceCase,
    saving,
    saved,
    walkthroughDoneToday,
    startWalkthrough,
    retryGenerate,
    goToLanding,
    skipToPractice,
    startPractice,
    saveToReviewBank,
  };
}
