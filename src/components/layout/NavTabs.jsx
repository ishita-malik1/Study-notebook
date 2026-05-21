import { NavLink } from 'react-router-dom';

const TABS = [
  { label: 'Product Case', shortLabel: 'Product', path: '/product-case', color: '#4a90d9' },
  { label: 'TPM Case', shortLabel: 'TPM', path: '/tpm-case', color: '#7b68ee' },
  { label: 'Habits', shortLabel: 'Habits', path: '/habits', color: '#52b788' },
  { label: 'Progress', shortLabel: 'Progress', path: '/progress', color: '#f4a261' },
  { label: 'Review Bank', shortLabel: 'Review', path: '/review-bank', color: '#e07b54' },
];

export default function NavTabs() {
  return (
    <div className="nav-tabs relative z-10 flex items-end overflow-x-auto px-2 sm:px-4 pt-2 ml-0 sm:ml-[48px] md:ml-[80px] scrollbar-thin">
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            [
              'nav-tab-link relative -mb-px px-3 sm:px-5 py-2 text-xs sm:text-sm font-medium font-body rounded-t-md transition-all whitespace-nowrap flex-shrink-0',
              'border-t-4 no-underline',
              isActive
                ? 'bg-[#fdf8f0] text-gray-800 shadow-sm z-20 -translate-y-0.5'
                : 'bg-[#f0e8d8] text-gray-600 z-10 hover:bg-[#ebe3d3]',
            ].join(' ')
          }
          style={{
            borderTopColor: tab.color,
            marginRight: '-4px',
          }}
        >
          <span className="sm:hidden">{tab.shortLabel}</span>
          <span className="hidden sm:inline">{tab.label}</span>
        </NavLink>
      ))}
    </div>
  );
}
