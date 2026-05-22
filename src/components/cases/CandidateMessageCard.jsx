export default function CandidateMessageCard({ message }) {
  const thinking = message.thinking || '';
  const commonSlip = message.commonSlip || '';
  const says = message.says || message.content || '';
  const coachNote = message.coachNote || '';

  return (
    <div className="candidate-card conversation-bubble flex w-full flex-col gap-2 ml-auto">
      <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-gray-400 self-end">
        Ideal Answer
      </span>

      <div className="candidate-card-inner flex flex-col rounded-lg overflow-hidden border border-[#e8dcc8] shadow-sm">
        {thinking && (
          <div className="candidate-thinking px-4 py-3">
            <span className="candidate-section-label candidate-section-label--reasoning block mb-2">
              💭 Internal reasoning
            </span>
            <p className="candidate-thinking-body font-body text-sm text-gray-600">
              {thinking}
            </p>
          </div>
        )}

        {commonSlip && (
          <div className="candidate-common-slip px-4 py-3">
            <span className="candidate-section-label candidate-section-label--slip block mb-2">
              ⚠️ Common slip
            </span>
            <p className="font-body text-sm leading-relaxed text-gray-800">
              {commonSlip}
            </p>
          </div>
        )}

        {says && (
          <div className="candidate-says px-4 py-3">
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-gray-500 block mb-2">
              💬 Said
            </span>
            <p className="font-body text-sm leading-relaxed text-gray-800">
              {says}
            </p>
          </div>
        )}

        {coachNote && (
          <div className="candidate-coach px-4 py-3">
            <span className="font-body text-[10px] font-semibold uppercase tracking-wider text-amber-800 block mb-2">
              📌 Interview Tip
            </span>
            <p className="font-body text-sm font-medium leading-relaxed text-amber-950">
              {coachNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
