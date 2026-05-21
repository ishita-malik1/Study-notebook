import { useState } from 'react';
import { format } from 'date-fns';
import NavTabs from './NavTabs';
import PageTransition from './PageTransition';
import ErrorBoundary from './ErrorBoundary';
import DailySummaryOverlay from '../daily/DailySummaryOverlay';
import { useStreaks } from '../../hooks/useStreaks';
import { getTopStreakForStrip } from '../../utils/streakDisplay';
import { isAfterFivePm } from '../../utils/dailySummaryUtils';

const SPIRAL_RING_COUNT = 18;

export default function NotebookLayout() {
  const today = format(new Date(), 'EEEE, MMM d');
  const { streaks, loading: streaksLoading } = useStreaks();
  const topStreak = streaksLoading
    ? 'Loading streaks...'
    : getTopStreakForStrip(streaks) || 'No active streaks yet';
  const [summaryOpen, setSummaryOpen] = useState(false);
  const showEndDay = isAfterFivePm();

  return (
    <div className="min-h-screen flex flex-col bg-notebook-charcoal notebook-app-min">
      <div className="flex flex-1 flex-col min-h-screen min-h-[100dvh] w-full min-w-[768px]">
        <div className="flex flex-1 min-h-0">
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
                  <ErrorBoundary>
                    <PageTransition />
                  </ErrorBoundary>
                </div>
              </div>
            </div>

            <div
              className="flex-shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 px-3 sm:px-6 py-2 sm:py-0 text-white text-xs sm:text-sm font-body min-h-[48px]"
              style={{ backgroundColor: '#2c2c2c' }}
            >
              <span className="sm:flex-1 whitespace-nowrap">{today}</span>
              <span className="sm:flex-1 sm:text-center opacity-90 truncate max-w-full">
                {topStreak}
              </span>
              <span className="sm:flex-1 sm:text-right flex justify-start sm:justify-end w-full sm:w-auto">
                {showEndDay ? (
                  <button
                    type="button"
                    onClick={() => setSummaryOpen(true)}
                    className="end-day-btn font-medium text-[#f4a261] hover:text-[#ffc48a] transition-colors"
                  >
                    End My Day
                  </button>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      </div>

      {summaryOpen && (
        <DailySummaryOverlay onClose={() => setSummaryOpen(false)} />
      )}
    </div>
  );
}
