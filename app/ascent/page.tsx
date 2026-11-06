import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Ascent",
  description: "How SUMMIT intends to use trading fees for buybacks and KNTQ distributions.",
  alternates: { canonical: "/ascent" },
};

export default function AscentPage() {
  return (
    <article className="page-shell">
      <div className="page-narrow">
        <p className="eyebrow">The Ascent</p>
        <h1 className="display page-title">Every trade contributes to the journey.</h1>
        <div className="page-prose">
          <p>Trading activity is meant to generate fees for SUMMIT. Those fees have two intended uses.</p>
          <p>
            One portion buys SUMMIT in the market. A repurchase is not a payment to holders and it is
            not a burn. The treatment of repurchased tokens will be written down when it is decided.
            A buyback does not promise a higher price.
          </p>
          <p>
            The other portion buys KNTQ for distribution to eligible SUMMIT holders. What KNTQ is,
            beyond that role, has not been published here. Eligibility and the schedule are pending.
            Distributions depend on fees that were actually collected.
          </p>
          <p>None of this is operating yet. The contract is pending.</p>
        </div>
        <p className="narrative-follow">
          <Link href="/#engine" className="text-link">
            Back to the engine
          </Link>
        </p>
      </div>
    </article>
  );
}
