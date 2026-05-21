import { getLevelLabel, getPromotionText } from '../../utils/progressMetrics';

const LEVEL_COLORS = {
  beginner: 'bg-slate-100 text-slate-700 border-slate-300',
  intermediate: 'bg-amber-50 text-amber-800 border-amber-300',
  advanced: 'bg-indigo-50 text-indigo-800 border-indigo-300',
};

export default function LevelPanel({ learningProfile, liveSessionCount }) {
  const level = learningProfile?.current_level || 'beginner';
  const sessionsTotal =
    learningProfile?.sessions_total ?? liveSessionCount ?? 0;
  const promotion = getPromotionText(learningProfile);

  return (
    <div className="progress-panel rounded-lg border border-[#e8dcc8] bg-white/80 p-5 shadow-sm h-full">
      <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-gray-500">
        Your Level
      </h3>
      <span
        className={[
          'inline-block mt-4 px-4 py-2 rounded-md border text-lg font-bold tracking-wider font-body',
          LEVEL_COLORS[level] || LEVEL_COLORS.beginner,
        ].join(' ')}
      >
        {getLevelLabel(level)}
      </span>
      <p className="font-body mt-4 text-gray-800">
        <span className="font-semibold">{sessionsTotal}</span> sessions completed
      </p>
      {promotion && (
        <p className="font-body mt-2 text-sm text-gray-600">{promotion}</p>
      )}
    </div>
  );
}
