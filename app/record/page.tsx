import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { PageHeader } from "@/components/page-header";
import { Ledger, RidgeProfile } from "@/components/summit/narrative";
import { recordFields } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The Record",
  description: "Where SUMMIT will publish buybacks, KNTQ purchases, and distributions.",
  alternates: { canonical: "/record" },
};

export default function RecordPage() {
  return (
    <article className="page">
      <PageHeader
        eyebrow={
          <>
            <span>The Record</span>Transparency
          </>
        }
        title="One transparent record."
        lead="Every buyback. Every KNTQ purchase. Every distribution. Listed here once each one can be opened and checked."
        focus="74% 22%"
      />
      <div className="page-wide">
        <dl className="record-board">
          {recordFields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd className={field.value === "Pending" || field.value.startsWith("Not") ? "is-pending" : undefined}>
                {field.value}
              </dd>
            </div>
          ))}
        </dl>
        <RidgeProfile compact />
        <Ledger />
        <div className="prose page-prose">
          <p>
            When activity starts, this page is meant to show amounts and the transactions behind them.
            There is nothing to list yet. Figures will not be estimated.
          </p>
          <p className="section-follow">
            <Link href="/" className="text-link">
              Back to the summit
              <Arrow direction="right" />
            </Link>
          </p>
        </div>
      </div>
    </article>
  );
}
