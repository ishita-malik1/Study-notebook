import ConversationMessage from '../cases/ConversationMessage';

export default function ConversationModal({ session, onClose }) {
  if (!session) return null;

  const seenSteps = new Set();

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conversation-modal-title"
    >
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-lg border border-[#e8dcc8] bg-[#fdf8f0] shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8dcc8] bg-white/80">
          <h2
            id="conversation-modal-title"
            className="font-body text-sm font-semibold text-gray-800"
          >
            Full Conversation
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-xl leading-none px-2"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-4 flex flex-col gap-4 font-body">
          {(session.conversation || []).map((message, index) => {
            const showStepPill =
              message.stepId && !seenSteps.has(message.stepId);
            if (showStepPill) seenSteps.add(message.stepId);

            return (
              <ConversationMessage
                key={index}
                message={message}
                showStepPill={showStepPill}
              />
            );
          })}
          {!session.conversation?.length && (
            <p className="text-sm text-gray-500">No conversation saved.</p>
          )}
        </div>
      </div>
    </div>
  );
}
