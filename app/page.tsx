import { Ascent, Questions, Record } from "@/components/summit/narrative";
import { LivingSummit } from "@/components/summit/living-summit";

export default function HomePage() {
  return (
    <>
      <LivingSummit />
      <Ascent />
      <Record />
      <Questions />
    </>
  );
}
