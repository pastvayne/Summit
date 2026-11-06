import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Mechanism } from "@/components/mechanism";
import { StrategySection } from "@/components/strategy-section";
import { Tokenomics } from "@/components/tokenomics";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mechanism />
      <StrategySection />
      <Tokenomics />
      <Faq />
    </>
  );
}
