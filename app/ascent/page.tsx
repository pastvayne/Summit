import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { PageHeader } from "@/components/page-header";
import { AscentEngine } from "@/components/summit/ascent-engine";

export const metadata: Metadata = {
  title: "The Ascent",
  description: "How SUMMIT intends to use trading fees for buybacks and KNTQ distributions.",
  alternates: { canonical: "/ascent" },
};

export default function AscentPage() {
  return (
    <article className="page">
      <PageHeader
        eyebrow={
          <>
            <span>The Ascent</span>Mechanism
          </>
        }
        title="Every trade contributes to the journey."
        lead="Trading activity is meant to generate fees for SUMMIT. Those fees have two intended uses."
        focus="66% 34%"
      />
      <div className="page-body">
        <div className="prose page-prose">
          <h2 className="prose-head">Route A · SUMMIT buybacks</h2>
          <p>
            One portion buys SUMMIT in the market. A repurchase is not a payment to holders and it is
            not a burn. The treatment of repurchased tokens will be written down when it is decided.
            A buyback does not promise a higher price.
          </p>
          <h2 className="prose-head">Route B · KNTQ distributions</h2>
          <p>
            The other portion buys KNTQ for distribution to eligible SUMMIT holders. What KNTQ is,
            beyond that role, has not been published here. Eligibility and the schedule are pending.
            Distributions depend on fees that were actually collected.
          </p>
          <p className="callout">None of this is operating yet. The contract is pending.</p>
        </div>
      </div>
      <AscentEngine />
      <div className="page-body page-body-end">
        <p className="section-follow">
          <Link href="/record" className="text-link">
            Where activity will be recorded
            <Arrow direction="right" />
          </Link>
        </p>
      </div>
    </article>
  );
}
