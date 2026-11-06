import type { Metadata } from "next";
import Link from "next/link";
import { recordFields } from "@/lib/brand";

export const metadata: Metadata = {
  title: "The Record",
  description: "Where SUMMIT will publish buybacks, KNTQ purchases, and distributions.",
  alternates: { canonical: "/record" },
};

export default function RecordPage() {
  return (
    <article className="page-shell">
      <div className="page-narrow">
        <p className="eyebrow">The Record</p>
        <h1 className="display page-title">One transparent record.</h1>
        <p className="page-lead mt-6">
          Every buyback. Every KNTQ purchase. Every distribution. Listed here once each one can be
          opened and checked.
        </p>
        <dl className="record-list">
          {recordFields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.value}</dd>
            </div>
          ))}
        </dl>
        <div className="page-prose">
          <p>
            When activity starts, this page is meant to show amounts and the transactions behind
            them. There is nothing to list yet. Figures will not be estimated.
          </p>
        </div>
        <p className="narrative-follow">
          <Link href="/#record" className="text-link">
            Back home
          </Link>
        </p>
      </div>
    </article>
  );
}
