import Link from "next/link";
import { PinwheelStage } from "@/components/origami/pinwheel-stage";
import { site } from "@/lib/protocol";

export function Hero() {
  return (
    <section id="overview" className="section-anchor paper-field relative overflow-hidden">
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 pt-14 pb-8 sm:px-8 sm:pt-20 sm:pb-10 lg:grid-cols-2 lg:gap-6 lg:pt-24 lg:pb-12">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-brass uppercase">Solana · $MILL</p>
          <h1 className="mt-5 text-[clamp(3.1rem,8vw,5.7rem)] leading-[0.88] font-semibold tracking-[-0.055em] text-paper uppercase">
            <span className="block">The mill</span>
            <span className="block">never stops.</span>
          </h1>
          <p className="mt-6 text-2xl tracking-[-0.03em] text-paper">Every trade feeds the mill.</p>
          <p className="mt-4 max-w-xl text-base leading-7 text-paper-dim">{site.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/#strategy" className="btn btn-solid">
              Explore the Strategy
            </Link>
            <Link href="/treasury" className="btn btn-ghost">
              View Treasury
            </Link>
          </div>
        </div>
        <PinwheelStage />
      </div>
    </section>
  );
}
