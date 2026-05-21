export default function PracticePlaceholder({ practiceCase, onBack }) {
  return (
    <div className="case-practice-placeholder mt-8 text-center py-12">
      {practiceCase && (
        <p className="font-body text-sm text-gray-500 mb-4 max-w-lg mx-auto">
          Reserved: {practiceCase.company} — {practiceCase.problemType}
        </p>
      )}
      <p className="font-body text-lg text-gray-700">
        Practice mode coming soon — check back after Phase 4
      </p>
      <button type="button" onClick={onBack} className="case-btn-secondary mt-6">
        Back to cases
      </button>
    </div>
  );
}
