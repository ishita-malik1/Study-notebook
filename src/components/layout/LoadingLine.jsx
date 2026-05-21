export default function LoadingLine({ className = '' }) {
  return (
    <div className={`loading-line-wrap ${className}`} role="status" aria-label="Loading">
      <div className="loading-line-track">
        <div className="loading-line-pencil" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
