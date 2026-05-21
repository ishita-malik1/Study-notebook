export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      className="fixed bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-md bg-red-600 px-4 py-2 text-sm text-white shadow-lg font-body"
      role="alert"
    >
      {message}
    </div>
  );
}
