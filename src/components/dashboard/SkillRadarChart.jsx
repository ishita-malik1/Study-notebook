import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import {
  getRadarData,
  getStrongestAndWeakest,
  computeStepAveragesFromSessions,
} from '../../utils/progressMetrics';

const CHART_FONT = 'Lato, system-ui, sans-serif';

export default function SkillRadarChart({ liveSessions }) {
  const sessionCount = liveSessions.length;

  if (sessionCount < 3) {
    return (
      <div className="progress-panel rounded-lg border border-[#e8dcc8] bg-white/80 p-5 shadow-sm h-full flex items-center justify-center min-h-[280px]">
        <p className="font-body text-sm text-gray-500 text-center px-4">
          Complete 3+ sessions to see your skill radar
        </p>
      </div>
    );
  }

  const data = getRadarData(liveSessions);
  const averages = computeStepAveragesFromSessions(liveSessions);
  const { strongest, weakest } = getStrongestAndWeakest(averages);

  return (
    <div className="progress-panel rounded-lg border border-[#e8dcc8] bg-white/80 p-5 shadow-sm h-full">
      <h3 className="font-body text-sm font-semibold uppercase tracking-wide text-gray-500 mb-2">
        Framework Skills
      </h3>
      <div className="w-full h-[260px]" style={{ background: '#fdf8f0' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
            <PolarGrid stroke="#c5d0e6" />
            <PolarAngleAxis
              dataKey="step"
              tick={{ fontSize: 11, fill: '#4b5563', fontFamily: CHART_FONT }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              tickCount={6}
              tick={{ fontSize: 10, fill: '#9ca3af', fontFamily: CHART_FONT }}
            />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#4a90d9"
              fill="#4a90d9"
              fillOpacity={0.3}
              isAnimationActive={false}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      {strongest && weakest && (
        <p className="font-body mt-3 text-sm text-gray-600">
          Strongest: <span className="font-medium">{strongest.name}</span> — Needs
          work: <span className="font-medium">{weakest.name}</span>
        </p>
      )}
    </div>
  );
}
