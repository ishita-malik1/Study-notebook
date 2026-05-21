import { NavLink } from 'react-router-dom';

const TABS = [
  { label: 'Product Case', path: '/product-case', color: '#4a90d9' },
  { label: 'TPM Case', path: '/tpm-case', color: '#7b68ee' },
  { label: 'Habits', path: '/habits', color: '#52b788' },
  { label: 'Progress', path: '/progress', color: '#f4a261' },
];

export default function NavTabs() {
  return (
    <div
      className="relative z-10 flex items-end px-4 pt-2"
      style={{ marginLeft: '80px' }}
    >
      {TABS.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          className={({ isActive }) =>
            [
              'relative -mb-px px-5 py-2 text-sm font-medium font-body rounded-t-md transition-all',
              'border-t-4 no-underline',
              isActive
                ? 'bg-[#fdf8f0] text-gray-800 shadow-sm z-20 -translate-y-0.5'
                : 'bg-[#f0e8d8] text-gray-600 z-10 hover:bg-[#ebe3d3]',
            ].join(' ')
          }
          style={({ isActive }) => ({
            borderTopColor: tab.color,
            marginRight: '-4px',
          })}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}
