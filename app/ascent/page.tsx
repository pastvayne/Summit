import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Field notes",
  description: "Notes on Summit, the mountain past the weather, and what has not been written yet.",
  alternates: { canonical: "/ascent" },
};

export default function AscentPage() {
  return (
    <>
      <div className="page-band">
        <Image
          src="/summit/hero.jpg"
          alt="The wide night view of the summit, clouds below and a violet light at the peak."
          fill
          sizes="100vw"
          className="object-cover object-[68%_36%]"
        />
      </div>
      <article className="page-shell">
        <div className="page-narrow">
          <p className="eyebrow">Notes</p>
          <h1 className="display page-title">The mountain was here before the name.</h1>
          <div className="page-prose">
            <p>
              Summit is a horizon given a word. It borrows the night, the distance, and the unfinished
              dawn of Ascend, then keeps its own peak.
            </p>
            <p>
              What you meet first is the whole project: stone above a sea of cloud, and a light that
              does not explain itself. The climb is the point. The weather is not.
            </p>
            <p>
              A mark that can be traded, and an account that can be read, wait until they can be
              written down without invention. Until then the record stays closed.
            </p>
            <p>A new horizon awaits. The ascent begins here.</p>
          </div>
          <p className="narrative-follow">
            <Link href="/#overview" className="text-link">
              Return to the mountain
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
