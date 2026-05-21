const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Product' },
  { id: 'tpm', label: 'TPM' },
  { id: 'weak', label: 'Weak sessions' },
  { id: 'strong', label: 'Strong sessions' },
];

export default function ReviewFilterBar({ active, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 font-body">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          type="button"
          onClick={() => onChange(f.id)}
          className={[
            'px-3 py-1.5 rounded-full text-sm border transition-colors',
            active === f.id
              ? 'bg-[#e07b54] text-white border-[#e07b54]'
              : 'bg-white/80 text-gray-700 border-[#e8dcc8] hover:border-[#e07b54]',
          ].join(' ')}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
