"use client";

import { useState } from "react";

const steps = [
  {
    id: "trading",
    label: "Trading",
    body: "SUMMIT is meant to collect fees from trading activity. A fee only counts when it is actually received.",
  },
  {
    id: "fees",
    label: "Fees",
    body: "Collected fees are split into two uses. One portion is for SUMMIT buybacks. The other is for KNTQ purchases. The split has not been published.",
  },
  {
    id: "buybacks",
    label: "SUMMIT buybacks",
    body: "One portion is intended to repurchase SUMMIT in the market. A buyback is not a distribution, and it is not a burn. What happens to repurchased tokens will be documented when it is decided.",
  },
  {
    id: "hype",
    label: "KNTQ purchases",
    body: "The other portion is intended to buy KNTQ. Buying it does not by itself pay anyone. What KNTQ is, beyond this use, has not been published here.",
  },
  {
    id: "distributions",
    label: "KNTQ distributions",
    body: "Purchased KNTQ is intended for eligible SUMMIT holders. Eligibility, timing, and amounts depend on fees actually collected and on rules that are not published yet. Nothing here is a yield.",
  },
] as const;

export function AscentEngine() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section id="engine" className="section-anchor engine">
      <div className="engine-stage">
        <div>
          <p className="eyebrow">The mechanism</p>
          <h2 className="display engine-title">The Ascent Engine</h2>
          <div className="engine-diagram" role="group" aria-label="Intended fee path">
            <FlowButton index={0} active={active} onSelect={setActive} label="Trading" />
            <span className="engine-join" aria-hidden="true" />
            <FlowButton index={1} active={active} onSelect={setActive} label="Fees" />
            <span className="engine-join engine-join-split" aria-hidden="true" />
            <div className="engine-branches">
              <FlowButton index={2} active={active} onSelect={setActive} label="SUMMIT buybacks" />
              <div className="engine-branch">
                <FlowButton index={3} active={active} onSelect={setActive} label="KNTQ purchases" />
                <span className="engine-join" aria-hidden="true" />
                <FlowButton index={4} active={active} onSelect={setActive} label="KNTQ distributions" />
              </div>
            </div>
          </div>
        </div>
        <div className="engine-note" aria-live="polite">
          <p className="engine-index">0{active + 1}</p>
          <h3>{step.label}</h3>
          <p>{step.body}</p>
          <p className="engine-aside">Intended model. Not evidence that any of this is already running.</p>
        </div>
      </div>
    </section>
  );
}

function FlowButton({
  index,
  active,
  onSelect,
  label,
}: {
  index: number;
  active: number;
  onSelect: (index: number) => void;
  label: string;
}) {
  const selected = index === active;
  return (
    <button
      type="button"
      className={`engine-node${selected ? " is-on" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          onSelect(Math.min(4, index + 1));
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          onSelect(Math.max(0, index - 1));
        }
      }}
    >
      {label}
    </button>
  );
}
