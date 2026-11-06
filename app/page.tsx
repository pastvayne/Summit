import { Altimeter } from "@/components/summit/altimeter";
import { AscentEngine } from "@/components/summit/ascent-engine";
import { LivingSummit } from "@/components/summit/living-summit";
import { Community, Hype, Record } from "@/components/summit/narrative";

export default function HomePage() {
  return (
    <>
      <LivingSummit />
      <AscentEngine />
      <Hype />
      <Record />
      <Community />
      <Altimeter />
    </>
  );
}
