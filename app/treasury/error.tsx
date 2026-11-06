"use client";

export default function TreasuryError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="page-shell" role="alert">
      <p className="eyebrow">Record</p>
      <h1 className="display page-title">The page could not be opened.</h1>
      <button type="button" className="text-link mt-8" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
