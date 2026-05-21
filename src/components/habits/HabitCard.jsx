import HabitCheck from './HabitCheck';

export default function HabitCard({
  name,
  description,
  completed,
  streak,
  onComplete,
  disabled,
}) {
  const streakText =
    streak?.current > 0
      ? `🔥 ${streak.current} day streak`
      : 'Start your streak!';

  return (
    <div
      className={[
        'habit-card flex flex-col gap-3 rounded-lg border p-4 shadow-sm transition-colors',
        completed
          ? 'border-emerald-200 bg-emerald-50/50'
          : 'border-[#e8dcc8] bg-white/70',
      ].join(' ')}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3
            className={[
              'font-body text-base font-semibold',
              completed ? 'text-gray-500 line-through' : 'text-gray-800',
            ].join(' ')}
          >
            {name}
          </h3>
          <p
            className={[
              'font-body mt-1 text-sm',
              completed ? 'text-gray-400 line-through' : 'text-gray-500',
            ].join(' ')}
          >
            {description}
          </p>
        </div>
        <HabitCheck
          completed={completed}
          onComplete={onComplete}
          disabled={disabled || completed}
        />
      </div>
      <p className="font-body text-sm text-gray-600">{streakText}</p>
    </div>
  );
}
