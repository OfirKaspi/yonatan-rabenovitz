export default function MediaSpinner() {
  return (
    <span
      className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-ink-900/25"
      aria-hidden
    >
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-sand-50/30 border-t-gold-500" />
    </span>
  );
}
