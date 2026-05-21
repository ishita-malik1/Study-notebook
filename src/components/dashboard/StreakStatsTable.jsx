import { HABIT_DEFINITIONS } from '../../constants/habits';
import { computeConsistencyScore } from '../../utils/progressMetrics';

export default function StreakStatsTable({ streaks, habits, sessions }) {
  const consistency = computeConsistencyScore(habits, sessions);

  return (
    <div className="progress-panel rounded-lg border border-[#e8dcc8] bg-white/80 p-5 shadow-sm h-full">
      <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
        Streak Stats
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full font-body text-sm">
          <thead>
            <tr className="border-b border-[#e8dcc8] text-left text-gray-500">
              <th className="pb-2 pr-4 font-medium">Habit</th>
              <th className="pb-2 pr-4 font-medium">Current</th>
              <th className="pb-2 font-medium">Longest</th>
            </tr>
          </thead>
          <tbody>
            {HABIT_DEFINITIONS.map((habit) => {
              const entry = streaks?.[habit.streakKey] || {
                current: 0,
                longest: 0,
              };
              const current = entry.current ?? 0;
              const longest = entry.longest ?? 0;
              const flame = current > 3 ? '🔥 ' : '';

              return (
                <tr key={habit.key} className="border-b border-[#f0e8d8]">
                  <td className="py-2.5 pr-4 text-gray-800">
                    <span className="mr-1" aria-hidden>
                      {habit.icon}
                    </span>
                    {habit.name}
                  </td>
                  <td className="py-2.5 pr-4 font-medium text-gray-800">
                    {flame}
                    {current} day{current === 1 ? '' : 's'}
                  </td>
                  <td className="py-2.5 text-gray-600">
                    {longest} day{longest === 1 ? '' : 's'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="font-body mt-4 text-sm text-gray-700">
        Consistency score:{' '}
        <span className="font-semibold">{consistency}%</span>
        <span className="text-gray-500 block text-xs mt-1">
          Days with 3+ habits done ÷ days since you started
        </span>
      </p>
    </div>
  );
}
