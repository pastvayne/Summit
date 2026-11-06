import Link from "next/link";
import { allocationRows } from "@/lib/protocol";

export function AllocationDiagram() {
  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <h3 className="font-serif text-2xl text-paper">Allocation</h3>
      </div>
      <ol className="mt-6">
        {allocationRows.map((row, index) => (
          <li key={row.name} className="border-t border-line py-4">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-brass">0{index + 1}</span>
              <span className="text-paper">{row.name}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function StrategySection() {
  const points = [
    {
      title: "Fees enter only if they are eligible",
      body: "Trading activity can produce a creator or protocol fee. PaperMill counts a fee only when that fee is actually routed to the treasury. The route is not configured.",
    },
    {
      title: "The treasury is a wallet, not a forecast",
      body: "Fees sit in a Solana treasury wallet until they are allocated.",
    },
    {
      title: "PAPER rewards are conditional",
      body: "Rewards require a Papertrade strategy the protocol can actually use. Transfer, bridge, and stake support is not assumed. No rate is quoted.",
    },
    {
      title: "Buybacks spend realized rewards",
      body: "Realized rewards buy $MILL. A burn is separate from a buyback.",
    },
  ];

  return (
    <section id="strategy" className="section-anchor border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">03 / Strategy</p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">
            From fees to buybacks, only when the step is real.
          </h2>
          <p className="text-sm leading-6 text-muted">
            PaperMill is a treasury design for the Papertrade ecosystem. It is not Papertrade, and
            it does not operate a hidden book of positions.
          </p>
        </div>
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-2">
          {points.map((point, index) => (
            <article key={point.title} className="bg-ink p-6 sm:p-8">
              <p className="font-mono text-[11px] text-brass">0{index + 1}</p>
              <h3 className="mt-3 font-serif text-2xl text-paper">{point.title}</h3>
              <p className="mt-3 text-sm leading-6 text-paper-dim">{point.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <AllocationDiagram />
          <div className="panel p-6 sm:p-8">
            <h3 className="font-serif text-2xl text-paper">What can be checked</h3>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-paper-dim">
              <li>The treasury wallet on a Solana explorer.</li>
              <li>The mint address.</li>
              <li>Buyback and burn signatures tied to that wallet.</li>
            </ul>
            <p className="mt-5 text-sm leading-6 text-muted">
              Internal notes are not chain proof. If a step happens on Papertrade, that venue’s own
              record is a separate source.
            </p>
            <Link href="/strategy" className="btn btn-ghost mt-6">
              Read the strategy memo
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
