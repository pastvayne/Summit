import { tokenFields } from "@/lib/protocol";

export function Tokenomics() {
  return (
    <section id="tokenomics" className="section-anchor border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">04 / Tokenomics</p>
        <div className="mt-3 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <h2 className="font-serif text-4xl tracking-tight text-paper sm:text-5xl">Specification.</h2>
          <p className="text-sm leading-6 text-muted">PaperMill, ticker $MILL, on Solana.</p>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div className="border border-line bg-panel p-6">
            <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Asset</p>
            <p className="mt-6 font-serif text-6xl text-paper">$MILL</p>
            <p className="mt-3 text-sm text-muted">PaperMill on Solana</p>
          </div>
          <dl className="border-t border-line">
            {tokenFields.map((field) => (
              <div
                key={field.label}
                className="grid gap-1 border-b border-line py-4 sm:grid-cols-[180px_1fr_1.2fr] sm:items-baseline sm:gap-6"
              >
                <dt className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{field.label}</dt>
                <dd className="text-paper">{field.value}</dd>
                <dd className="text-sm text-muted">{field.note}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 grid gap-px bg-line md:grid-cols-2">
          <article className="bg-ink p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Creator fees</p>
            <h3 className="mt-3 font-serif text-2xl text-paper">A route chosen by a launch or trade venue</h3>
            <p className="mt-3 text-sm leading-6 text-paper-dim">
              A Solana creator fee is value a venue can direct to a coin creator or another named
              recipient. It depends on that venue’s rules. It is not a property of every transfer.
            </p>
          </article>
          <article className="bg-ink p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.16em] text-brass uppercase">Token-2022 transfer fees</p>
            <h3 className="mt-3 font-serif text-2xl text-paper">A fee enforced by the token program</h3>
            <p className="mt-3 text-sm leading-6 text-paper-dim">
              A Token-2022 transfer fee is charged by the token program when the mint is configured
              for it. It is a different mechanism, with different accounts and different rules.
            </p>
          </article>
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-6 text-muted">
          PaperMill does not treat those two fee paths as interchangeable. Either one applies only
          if it is actually available, configured, and usable for this treasury. Neither has been
          configured.
        </p>
      </div>
    </section>
  );
}
