import { useCallback, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import {
  conductInterview,
  conductInterviewStream,
  evaluateSession,
  saveLiveSession,
  fetchLearningProfile,
} from '../services/interviewApi';
import { getLearningProfile } from '../utils/caseSessionStorage';
import { useStreaks } from './useStreaks';

const OPENER = 'Tell me — how would you approach this problem?';

export function usePracticeSession({ caseType, practiceCase }) {
  const { refresh: refreshStreaks } = useStreaks();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [streamError, setStreamError] = useState(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [evaluating, setEvaluating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [learningProfile, setLearningProfile] = useState(null);
  const [partialAssistant, setPartialAssistant] = useState('');
  const messagesEndRef = useRef(null);

  const caseContext = practiceCase
    ? {
        problemStatement: practiceCase.problemStatement,
        company: practiceCase.company,
        domain: practiceCase.domain,
        problemType: practiceCase.problemType,
        type: caseType,
      }
    : null;

  useEffect(() => {
    if (!caseType) return;
    getLearningProfile(caseType).then(setLearningProfile).catch(() => {});
  }, [caseType]);

  useEffect(() => {
    if (practiceCase && messages.length === 0) {
      setMessages([
        { role: 'assistant', content: OPENER, id: 'opener' },
      ]);
    }
  }, [practiceCase]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partialAssistant]);

  const buildHistory = useCallback(
    (extra = []) => [...messages, ...extra].map((m) => ({
      role: m.role,
      content: m.content,
    })),
    [messages]
  );

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || !caseContext || loading || streaming) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
    };

    setInput('');
    setStreamError(null);
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setStreaming(true);
    setPartialAssistant('');

    const history = buildHistory([userMsg]);
    let assembled = '';

    try {
      await conductInterviewStream(
        {
          caseContext,
          conversationHistory: history,
          learningProfile,
        },
        {
          onDelta: (delta) => {
            assembled += delta;
            setPartialAssistant(assembled);
          },
          onDone: ({ sessionComplete, fullText }) => {
            const content = assembled || fullText || '';
            setMessages((prev) => [
              ...prev,
              {
                id: `assistant-${Date.now()}`,
                role: 'assistant',
                content,
                sessionComplete,
              },
            ]);
            setPartialAssistant('');
            setStreaming(false);
            setLoading(false);
          },
          onError: () => {},
        }
      );
    } catch (err) {
      setStreamError(err.message);
      setStreaming(false);
      setLoading(false);
      setPartialAssistant('');

      try {
        const fallback = await conductInterview({
          caseContext,
          conversationHistory: history,
          learningProfile,
        });
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: fallback.message,
            sessionComplete: fallback.sessionComplete,
          },
        ]);
        setStreamError(null);
      } catch (fallbackErr) {
        setStreamError(fallbackErr.message || 'Failed to get response');
      }
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }, [
    input,
    caseContext,
    loading,
    streaming,
    buildHistory,
    learningProfile,
  ]);

  const continueStream = useCallback(() => {
    if (partialAssistant) {
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-partial-${Date.now()}`,
          role: 'assistant',
          content: partialAssistant,
        },
      ]);
      setPartialAssistant('');
    }
    setStreamError(null);
  }, [partialAssistant]);

  const endSession = useCallback(async () => {
    const userCount = messages.filter((m) => m.role === 'user').length;
    if (userCount === 0) {
      return { error: "You haven't started yet — at least attempt the case." };
    }

    setEvaluating(true);
    try {
      const result = await evaluateSession({
        caseContext,
        conversationHistory: buildHistory(),
        hintUsed,
      });
      setEvaluation(result);
      return { evaluation: result };
    } catch (err) {
      return { error: err.message };
    } finally {
      setEvaluating(false);
    }
  }, [messages, caseContext, buildHistory, hintUsed]);

  const saveSession = useCallback(async () => {
    if (!evaluation || !caseContext) return;

    setSaving(true);
    try {
      await saveLiveSession({
        date: format(new Date(), 'yyyy-MM-dd'),
        type: caseType,
        caseMetadata: {
          problemType: caseContext.problemType,
          company: caseContext.company,
          domain: caseContext.domain,
          problemStatement: caseContext.problemStatement,
        },
        conversation: buildHistory(),
        scores: evaluation.scores,
        band: evaluation.band,
        feedback: evaluation.feedback,
        hintUsed,
        stepsCovered: evaluation.stepsCovered,
      });
      const profile = await fetchLearningProfile(caseType);
      setLearningProfile(profile);
      await refreshStreaks().catch(() => {});
      setSaved(true);
    } catch (err) {
      throw err;
    } finally {
      setSaving(false);
    }
  }, [evaluation, caseContext, caseType, buildHistory, hintUsed]);

  const useHint = useCallback(() => setHintUsed(true), []);

  return {
    messages,
    input,
    setInput,
    loading,
    streaming,
    streamError,
    partialAssistant,
    hintUsed,
    evaluation,
    evaluating,
    saving,
    saved,
    messagesEndRef,
    sendMessage,
    endSession,
    saveSession,
    useHint,
    continueStream,
    setEvaluation,
  };
}
