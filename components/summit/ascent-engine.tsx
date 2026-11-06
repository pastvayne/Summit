"use client";

import { useState } from "react";

const steps = [
  {
    id: "trading",
    label: "Trading",
    note: "Fee source",
    lane: null,
    body: "SUMMIT is meant to collect fees from trading activity. A fee only counts when it is actually received.",
    facts: [
      ["Counted", "Only fees actually received"],
      ["Status", "Not running yet"],
    ],
  },
  {
    id: "fees",
    label: "Fees",
    note: "Split pending",
    lane: null,
    body: "Collected fees are split into two uses. One portion is for SUMMIT buybacks. The other is for KNTQ purchases. The split has not been published.",
    facts: [
      ["Uses", "Buybacks and KNTQ purchases"],
      ["Split", "Not published"],
    ],
  },
  {
    id: "buybacks",
    label: "SUMMIT buybacks",
    note: "Route A",
    lane: "A",
    body: "One portion is intended to repurchase SUMMIT in the market. A buyback is not a distribution, and it is not a burn. What happens to repurchased tokens will be documented when it is decided.",
    facts: [
      ["Burn", "No"],
      ["Repurchased tokens", "Treatment to be documented"],
      ["Price", "No promise of a higher price"],
    ],
  },
  {
    id: "purchases",
    label: "KNTQ purchases",
    note: "Route B",
    lane: "B",
    body: "The other portion is intended to buy KNTQ. Buying it does not by itself pay anyone. What KNTQ is, beyond this use, has not been published here.",
    facts: [
      ["Pays holders", "Not by itself"],
      ["What KNTQ is", "Not published here"],
    ],
  },
  {
    id: "distributions",
    label: "KNTQ distributions",
    note: "Eligible holders",
    lane: "B",
    body: "Purchased KNTQ is intended for eligible SUMMIT holders. Eligibility, timing, and amounts depend on fees actually collected and on rules that are not published yet. Nothing here is a yield.",
    facts: [
      ["Eligibility", "Not published"],
      ["Timing", "Not published"],
      ["Amount", "Depends on fees collected"],
      ["Yield", "No"],
    ],
  },
] as const;

/** Which connectors lead to each step (so the path to the selected node lights up). */
const pathTo: Record<number, string[]> = {
  0: [],
  1: ["a"],
  2: ["a", "split", "top", "lane-a"],
  3: ["a", "split", "bottom"],
  4: ["a", "split", "bottom", "b"],
};

export function AscentEngine() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  const lit = new Set(pathTo[active]);
  const on = (id: string) => (lit.has(id) ? " is-lit" : "");

  const select = (index: number) => setActive(Math.min(steps.length - 1, Math.max(0, index)));

  return (
    <section id="engine" className="section-anchor engine" aria-labelledby="engine-title">
      <header className="section-head">
        <p className="camp-tag">
          <span>Camp I</span>The mechanism
        </p>
        <h2 id="engine-title" className="display section-title">
          The Ascent Engine
        </h2>
        <p className="section-lead">
          Trading fees are meant to take two routes: one buys SUMMIT back, the other buys KNTQ for
          eligible holders.
        </p>
        <p className="section-sub">Select any stage to see what is published, and what is not yet.</p>
      </header>

      <div className="engine-board">
        <div className="engine-map" role="group" aria-label="Intended fee path">
          <Node index={0} active={active} onSelect={select} className="n-trading" />
          <span className={`wire w-a${on("a")}`} aria-hidden="true" />
          <Node index={1} active={active} onSelect={select} className="n-fees" />
          <span className={`wire-split${on("split")}`} aria-hidden="true">
            <span className={`split-top${on("top")}`} />
            <span className={`split-bottom${on("bottom")}`} />
          </span>
          <span className="lane-tag lane-tag-a" aria-hidden="true">
            Route A
          </span>
          <span className="lane-tag lane-tag-b" aria-hidden="true">
            Route B
          </span>
          <Node index={2} active={active} onSelect={select} className="n-buybacks" />
          <span className={`wire w-lane-a${on("lane-a")}`} aria-hidden="true" />
          <span className="terminal t-market" aria-hidden="true">
            Market
          </span>
          <Node index={3} active={active} onSelect={select} className="n-purchases" />
          <span className={`wire w-b${on("b")}`} aria-hidden="true" />
          <Node index={4} active={active} onSelect={select} className="n-distributions" />
        </div>

        <aside className="engine-detail" aria-live="polite">
          <div className="detail-top">
            <p className="detail-index">
              <span>{String(active + 1).padStart(2, "0")}</span> / 05
            </p>
            {step.lane ? <p className="detail-lane">Route {step.lane}</p> : null}
          </div>
          <h3>{step.label}</h3>
          <p className="detail-body">{step.body}</p>
          <dl className="facts">
            {step.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="detail-foot">
            <p className="engine-aside">Intended model. Not evidence that any of this is already running.</p>
            <div className="stepper">
              <button type="button" className="step-btn" onClick={() => select(active - 1)} disabled={active === 0}>
                <span aria-hidden="true">←</span>
                <span className="sr-only">Previous stage</span>
              </button>
              <button
                type="button"
                className="step-btn"
                onClick={() => select(active + 1)}
                disabled={active === steps.length - 1}
              >
                <span aria-hidden="true">→</span>
                <span className="sr-only">Next stage</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Node({
  index,
  active,
  onSelect,
  className,
}: {
  index: number;
  active: number;
  onSelect: (index: number) => void;
  className: string;
}) {
  const step = steps[index];
  const selected = index === active;
  return (
    <button
      type="button"
      className={`node ${className}${selected ? " is-on" : ""}`}
      aria-pressed={selected}
      onClick={() => onSelect(index)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          onSelect(index + 1);
          (event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".node")[Math.min(4, index + 1)])?.focus();
        }
        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          onSelect(index - 1);
          (event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>(".node")[Math.max(0, index - 1)])?.focus();
        }
      }}
    >
      <span className="node-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="node-label">{step.label}</span>
      <span className="node-note">{step.note}</span>
    </button>
  );
}
