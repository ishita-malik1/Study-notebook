import { useEffect, useState } from 'react';
import ConversationMessage from './ConversationMessage';

export default function ConversationThread({ conversation }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!conversation?.length) {
      setVisibleCount(0);
      return;
    }

    setVisibleCount(1);
    if (conversation.length === 1) return undefined;

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= conversation.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    return () => clearInterval(interval);
  }, [conversation]);

  if (!conversation?.length) return null;

  const seenSteps = new Set();

  return (
    <div className="flex flex-col gap-5">
      {conversation.slice(0, visibleCount).map((message, index) => {
        const showStepPill =
          message.stepId && !seenSteps.has(message.stepId);
        if (showStepPill) seenSteps.add(message.stepId);

        return (
          <div key={`msg-${index}-${message.role}`} className="chat-message-enter">
            <ConversationMessage message={message} showStepPill={showStepPill} />
          </div>
        );
      })}
    </div>
  );
}
