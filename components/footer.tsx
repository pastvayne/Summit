import Link from "next/link";
import { Mark } from "@/components/mark";
import { navItems } from "@/lib/protocol";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2.5 text-brass">
            <Mark />
            <span className="text-sm font-semibold tracking-[-0.04em] text-paper">papermill</span>
          </div>
          <p className="mt-4 max-w-sm font-serif text-2xl text-paper">The mill never stops.</p>
          <p className="mt-4 max-w-md text-sm leading-6 text-muted">
            PaperMill is an independent project. No official affiliation with Papertrade has been
            verified. Nothing on this site is an offer, a yield promise, or financial advice.
          </p>
        </div>
        <div>
          <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Map</p>
          <ul className="mt-4 space-y-2 text-sm text-paper-dim">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/strategy" className="hover:text-paper">
                Strategy
              </Link>
            </li>
            <li>
              <Link href="/#tokenomics" className="hover:text-paper">
                Tokenomics
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
