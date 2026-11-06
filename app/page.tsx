import { AscentEngine } from "@/components/summit/ascent-engine";
import { LivingSummit } from "@/components/summit/living-summit";
import { Community, Hype, Record, StatusStrip } from "@/components/summit/narrative";

export default function HomePage() {
  return (
    <>
      <LivingSummit />
      <StatusStrip />
      <AscentEngine />
      <Hype />
      <Record />
      <Community />
    </>
  );
}
