import { FRAMEWORK_STEPS } from '../../constants/caseFramework';
import { scoreBarColor } from '../../utils/scoringDisplay';

export default function StepScoreBars({ scores, compact = false }) {
  if (!scores) return null;

  return (
    <div
      className={[
        'flex items-end gap-1',
        compact ? 'h-6' : 'h-8',
      ].join(' ')}
      title="Framework step scores"
    >
      {FRAMEWORK_STEPS.map((step) => {
        const score = scores[step.id] ?? 0;
        const barHeight = compact
          ? Math.max(4, score * 4)
          : Math.max(6, score * 5);

        return (
          <div
            key={step.id}
            className="flex-1 min-w-[6px] max-w-[28px] flex flex-col justify-end h-full"
            title={`${step.name}: ${score}`}
          >
            <div
              className="w-full rounded-sm"
              style={{
                height: `${barHeight}px`,
                backgroundColor: score > 0 ? scoreBarColor(score) : '#e5e7eb',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
