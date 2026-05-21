import { Outlet } from 'react-router-dom';
import { format } from 'date-fns';
import NavTabs from './NavTabs';
import { useStreaks } from '../../hooks/useStreaks';
import { getStripStreakSummary } from '../../utils/streakDisplay';

const SPIRAL_RING_COUNT = 18;

export default function NotebookLayout() {
  const today = format(new Date(), 'EEEE, MMM d');
  const { streaks, loading: streaksLoading } = useStreaks();
  const streakSummary = streaksLoading
    ? 'Loading streaks...'
    : getStripStreakSummary(streaks);

  return (
    <div className="min-h-screen flex flex-col bg-notebook-charcoal">
      <div className="flex flex-1 flex-col min-h-screen min-h-[100dvh] w-full">
        <div className="flex flex-1 min-h-0">
          {/* Spiral binding — hidden on small screens */}
          <div
            className="hidden sm:flex flex-shrink-0 flex-col items-center justify-between py-4 md:py-6"
            style={{
              width: '48px',
              backgroundColor: '#2c2c2c',
            }}
          >
            {Array.from({ length: SPIRAL_RING_COUNT }).map((_, i) => (
              <div key={i} className="spiral-ring scale-90 md:scale-100" />
            ))}
          </div>

          <div className="flex-1 flex flex-col min-w-0 min-h-0 w-full">
            <div className="relative flex-1 flex flex-col min-h-0">
              <NavTabs />

              <div
                className="relative flex-1 overflow-auto"
                style={{ backgroundColor: '#fdf8f0' }}
              >
                <div className="notebook-margin-line hidden sm:block" />
                <div className="notebook-page-content notebook-page-content--responsive relative mx-auto w-full max-w-[960px] min-h-full pb-4">
                  <Outlet />
                </div>
              </div>
            </div>

            <div
              className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-0 px-3 sm:px-6 py-2 sm:py-0 text-white text-xs sm:text-sm font-body min-h-[48px]"
              style={{ backgroundColor: '#2c2c2c' }}
            >
              <span className="sm:flex-1">{today}</span>
              <span className="sm:flex-1 sm:text-center opacity-90 truncate max-w-full">
                {streakSummary}
              </span>
              <span className="hidden sm:block sm:flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
