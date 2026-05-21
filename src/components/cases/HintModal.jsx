export default function HintModal({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="max-w-md w-full rounded-lg bg-white p-6 shadow-xl font-body">
        <h3 className="text-lg font-semibold text-gray-800">💡 Hint</h3>
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Think about which step of the framework you might be missing. Review
          your walkthrough for guidance.
        </p>
        <p className="mt-3 text-sm font-medium text-amber-700">
          Using a hint deducts 0.5 from your final overall score.
        </p>
        <div className="mt-5 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="case-btn-secondary">
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="case-btn-primary">
            I understand
          </button>
        </div>
      </div>
    </div>
  );
}
