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
    body: "Collected fees are split into two uses. One portion is for SUMMIT buybacks. The other is for HYPE purchases. The split has not been published.",
  },
  {
    id: "buybacks",
    label: "SUMMIT buybacks",
    body: "One portion is intended to repurchase SUMMIT in the market. A buyback is not a distribution, and it is not a burn. What happens to repurchased tokens will be documented when it is decided.",
  },
  {
    id: "hype",
    label: "HYPE purchases",
    body: "The other portion is intended to buy HYPE. HYPE is the token of the Hyperliquid ecosystem. Buying it does not by itself pay anyone.",
  },
  {
    id: "distributions",
    label: "HYPE distributions",
    body: "Purchased HYPE is intended for eligible SUMMIT holders. Eligibility, timing, and amounts depend on fees actually collected and on rules that are not published yet. Nothing here is a yield.",
  },
] as const;

export function AscentEngine() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <section id="engine" className="section-anchor engine">
      <div className="engine-head">
        <p className="eyebrow">The mechanism</p>
        <h2 className="display engine-title">The Ascent Engine</h2>
        <p className="engine-lead">Every trade contributes to the journey.</p>
      </div>

      <div className="engine-flow" role="group" aria-label="Intended fee path">
        <FlowButton index={0} active={active} onSelect={setActive} label="Trading" />
        <FlowLine />
        <FlowButton index={1} active={active} onSelect={setActive} label="Fees" />
        <FlowSplit />
        <div className="engine-branches">
          <div className="engine-branch">
            <FlowButton index={2} active={active} onSelect={setActive} label="SUMMIT buybacks" />
          </div>
          <div className="engine-branch">
            <FlowButton index={3} active={active} onSelect={setActive} label="HYPE purchases" />
            <FlowLine />
            <FlowButton index={4} active={active} onSelect={setActive} label="HYPE distributions" />
          </div>
        </div>
      </div>

      <div className="engine-note" aria-live="polite">
        <p className="engine-note-kicker">{step.label}</p>
        <p>{step.body}</p>
      </div>
      <p className="engine-aside">This is the intended model. It is not evidence that fees, buybacks, or distributions are already running.</p>
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

function FlowLine() {
  return <span className="engine-line" aria-hidden="true" />;
}

function FlowSplit() {
  return <span className="engine-split" aria-hidden="true" />;
}
