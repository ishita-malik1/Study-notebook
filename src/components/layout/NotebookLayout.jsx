import { Outlet } from 'react-router-dom';
import { format } from 'date-fns';
import NavTabs from './NavTabs';

const SPIRAL_RING_COUNT = 18;

export default function NotebookLayout() {
  const today = format(new Date(), 'EEEE, MMM d');

  return (
    <div className="min-h-screen flex flex-col bg-notebook-charcoal">
      {/* Narrow viewport message */}
      <div className="min-[768px]:hidden fixed inset-0 z-50 flex items-center justify-center bg-notebook-charcoal p-8">
        <p className="text-white text-center text-lg font-body">
          Best experienced on a larger screen
        </p>
      </div>

      <div className="hidden min-[768px]:flex flex-1 flex-col min-h-screen min-w-[768px]">
        <div className="flex flex-1 min-h-0">
          {/* Spiral binding column */}
          <div
            className="flex-shrink-0 flex flex-col items-center justify-between py-6"
            style={{
              width: '60px',
              backgroundColor: '#2c2c2c',
            }}
          >
            {Array.from({ length: SPIRAL_RING_COUNT }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>

          {/* Main notebook area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0">
            <div className="relative flex-1 flex flex-col min-h-0">
              <NavTabs />

              {/* Content area with ruled lines */}
              <div className="relative flex-1 notebook-ruled overflow-auto">
                <div className="notebook-margin-line" />
                <div
                  className="relative mx-auto w-full max-w-[960px] min-h-full"
                  style={{
                    paddingLeft: '96px',
                    paddingRight: '16px',
                    paddingTop: '48px',
                  }}
                >
                  <Outlet />
                </div>
              </div>
            </div>

            {/* Bottom strip */}
            <div
              className="flex-shrink-0 flex items-center px-6 text-white text-sm font-body"
              style={{
                height: '48px',
                backgroundColor: '#2c2c2c',
              }}
            >
              <span className="flex-1">{today}</span>
              <span className="flex-1 text-center opacity-90">
                Jobs: 4 days | Outreach: 2 days
              </span>
              <span className="flex-1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
