"use client";

export default function TreasuryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24" role="alert">
      <p className="font-mono text-[11px] tracking-[0.2em] text-brass uppercase">Treasury</p>
      <h1 className="mt-3 font-serif text-4xl text-paper">The record could not be opened.</h1>
      <p className="mt-4 text-sm leading-6 text-muted">
        The page failed before a source could be read. No substitute balances are shown.
      </p>
      <button type="button" className="btn btn-solid mt-6" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
