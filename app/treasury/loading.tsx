export default function TreasuryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8" aria-busy="true" aria-live="polite">
      <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">Treasury workspace</p>
      <div className="mt-4 h-14 w-72 animate-pulse bg-panel motion-reduce:animate-none" />
      <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={`h-32 animate-pulse bg-ink-2 motion-reduce:animate-none ${index === 0 ? "xl:col-span-2" : ""}`} />
        ))}
      </div>
    </div>
  );
}
