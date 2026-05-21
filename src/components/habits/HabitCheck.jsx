export default function HabitCheck({ completed, onComplete, disabled }) {
  if (completed) {
    return (
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border-2 border-emerald-600 bg-emerald-50 text-emerald-700"
        aria-label="Completed"
      >
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onComplete}
      disabled={disabled}
      aria-label="Mark complete"
      className={[
        'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded border-2 border-gray-300 bg-white',
        'hover:border-emerald-500 hover:bg-emerald-50 transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-1',
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      ].join(' ')}
    />
  );
}
