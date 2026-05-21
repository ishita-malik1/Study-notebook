import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  format,
  parseISO,
  subDays,
} from 'date-fns';
import { HEATMAP_COLORS, HABIT_DEFINITIONS } from '../../constants/habits';

function countCompleted(habitDoc) {
  if (!habitDoc) return 0;
  return HABIT_DEFINITIONS.filter((h) => habitDoc[h.key]).length;
}

export default function HabitHeatmap({ history, loading }) {
  const [tooltip, setTooltip] = useState(null);

  const { days, byDate } = useMemo(() => {
    const end = new Date();
    const start = subDays(end, 89);
    const intervalDays = eachDayOfInterval({ start, end });

    const map = {};
    (history || []).forEach((doc) => {
      if (doc?.date) map[doc.date] = doc;
    });

    return {
      days: intervalDays.map((d) => format(d, 'yyyy-MM-dd')),
      byDate: map,
    };
  }, [history]);

  if (loading) {
    return (
      <p className="font-body text-sm text-gray-500">Loading activity...</p>
    );
  }

  return (
    <div className="habit-heatmap">
      <h2 className="font-handwriting text-2xl text-gray-800 mb-3">
        Activity — last 90 days
      </h2>
      <div className="flex flex-wrap gap-1">
        {days.map((dateStr) => {
          const count = countCompleted(byDate[dateStr]);
          const color = HEATMAP_COLORS[count] || HEATMAP_COLORS[0];
          const label = format(parseISO(dateStr), 'MMM d');

          return (
            <div
              key={dateStr}
              className="heatmap-cell"
              style={{ backgroundColor: color }}
              onMouseEnter={() =>
                setTooltip(`${label} — ${count}/4 habits`)
              }
              onMouseLeave={() => setTooltip(null)}
              title={`${label} — ${count}/4 habits`}
            />
          );
        })}
      </div>
      {tooltip && (
        <p className="font-body mt-2 text-sm text-gray-600">{tooltip}</p>
      )}
      <div className="font-body mt-3 flex items-center gap-2 text-xs text-gray-500">
        <span>Less</span>
        {[0, 1, 2, 3, 4].map((n) => (
          <span
            key={n}
            className="heatmap-legend-swatch"
            style={{ backgroundColor: HEATMAP_COLORS[n] }}
          />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
