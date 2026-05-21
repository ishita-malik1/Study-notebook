export default function StickyNote({ children, className = '' }) {
  return (
    <div
      className={[
        'sticky-note rounded-sm px-4 py-3 shadow-md font-body text-gray-800',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
