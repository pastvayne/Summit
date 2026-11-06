import type { Metadata } from "next";
import Link from "next/link";
import { AllocationDiagram } from "@/components/strategy-section";
import { risks } from "@/lib/protocol";

export const metadata: Metadata = {
  title: "Strategy",
  description:
    "How PaperMill collects eligible fees, allocates a Solana treasury toward supported PAPER strategies, and recycles realized rewards into $MILL buybacks.",
  alternates: { canonical: "/strategy" },
};

const chapters = [
  { href: "#intake", label: "Intake" },
  { href: "#treasury", label: "Treasury" },
  { href: "#rewards", label: "Rewards" },
  { href: "#buybacks", label: "Buybacks" },
  { href: "#verification", label: "Verification" },
  { href: "#allocation", label: "Allocation" },
  { href: "#risks", label: "Risks" },
];

export default function StrategyPage() {
  return (
    <article className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">Strategy memo</p>
      <h1 className="mt-3 max-w-3xl font-serif text-5xl tracking-tight text-paper sm:text-6xl">
        A treasury loop that only runs where the rails exist.
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-paper-dim">
        PaperMill is a Solana-native strategy built around the Papertrade ecosystem. Eligible
        trading fees accumulate in a treasury. Treasury assets are allocated toward supported
        PAPER-related strategies. Realized rewards buy back $MILL. A burn is separate from a buyback.
      </p>
      <dl className="mt-8 grid gap-px bg-line sm:grid-cols-3">
        {[
          ["Network", "Solana"],
          ["Reference", "Papertrade"],
          ["Affiliation", "Independent"],
        ].map(([label, value]) => (
          <div key={label} className="bg-ink-2 px-4 py-4">
            <dt className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">{label}</dt>
            <dd className="mt-2 text-sm text-paper">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 lg:grid lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-16">
        <nav className="sticky top-16 z-20 -mx-5 mb-8 flex gap-4 overflow-x-auto border-b border-line bg-ink/92 px-5 py-3 backdrop-blur lg:top-24 lg:mx-0 lg:mb-0 lg:block lg:space-y-3 lg:self-start lg:border-0 lg:bg-transparent lg:p-0" aria-label="Memo sections">
          {chapters.map((chapter) => (
            <a key={chapter.href} href={chapter.href} className="shrink-0 text-sm text-paper-dim hover:text-paper">
              {chapter.label}
            </a>
          ))}
        </nav>

        <div className="max-w-3xl space-y-14">
          <section id="intake" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">How trading fees enter</h2>
            <p className="mt-4 text-sm leading-7 text-paper-dim">
              The intake is trading activity that generates an eligible creator or protocol fee and
              names the PaperMill treasury as the recipient. A fee that stays with a venue, a
              creator, or another program is not treasury inventory.
            </p>
            <p className="mt-4 text-sm leading-7 text-paper-dim">
              Solana creator fees and Token-2022 transfer fees are different mechanisms. The memo
              does not treat them as substitutes. The tokenomics section keeps them apart.
            </p>
          </section>

          <section id="treasury" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">How treasury assets are managed</h2>
            <p className="mt-4 text-sm leading-7 text-paper-dim">
              Fees that clear rest in a Solana wallet. Management is the split between what stays in
              reserve and what is allocated. It is not a yield product, and this website does not move
              funds.
            </p>
          </section>

          <section id="rewards" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">How PAPER-related rewards are generated</h2>
            <p className="mt-4 text-sm leading-7 text-paper-dim">
              Rewards are possible only where Papertrade supports the strategy and the asset can
              actually be used there. PAPER is not assumed to be freely bought, transferred, bridged,
              or staked. If support is missing, the station stays idle. If support exists and a
              reward is paid, the reward is counted when it is received. Expected rewards are not
              shown as revenue.
            </p>
          </section>

          <section id="buybacks" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">How rewards become buybacks</h2>
            <p className="mt-4 text-sm leading-7 text-paper-dim">
              Realized rewards fund market purchases of $MILL. A purchase is a transaction. A burn is
              a separate transaction.
            </p>
          </section>

          <section id="verification" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">How buybacks and burns can be verified</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-7 text-paper-dim">
              <li>Open the treasury wallet and the $MILL mint in a Solana explorer.</li>
              <li>Match each buyback or burn signature to that wallet.</li>
              <li>Treat a figure on this website as secondary to the chain.</li>
            </ol>
          </section>

          <section id="allocation" className="section-anchor">
            <AllocationDiagram />
          </section>

          <section id="risks" className="section-anchor">
            <h2 className="font-serif text-3xl text-paper">Risks</h2>
            <div className="mt-6 space-y-5">
              {risks.map((risk) => (
                <div key={risk.title} className="border-t border-line pt-4">
                  <h3 className="text-paper">{risk.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{risk.body}</p>
                </div>
              ))}
            </div>
          </section>

          <p className="text-sm text-muted">
            PaperMill is independent unless an official relationship with Papertrade is verified.{" "}
            <Link href="/treasury" className="text-brass hover:text-brass-2">
              View the treasury record
            </Link>
            .
          </p>
        </div>
      </div>
    </article>
  );
}
