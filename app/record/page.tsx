import type { Metadata } from "next";
import Link from "next/link";
import { recordFields } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Record",
  description: "What Summit will say, and what it refuses to invent.",
  alternates: { canonical: "/record" },
};

export default function RecordPage() {
  return (
    <article className="page-shell">
      <div className="page-narrow">
        <p className="eyebrow">Colophon</p>
        <h1 className="display page-title">The page stays honest.</h1>
        <p className="page-lead mt-6">
          Names that exist are written here. Numbers that do not exist are not.
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
            Summit is independent. Ascend is the universe it looks like, not a contract, a treasury,
            or a partnership this site can claim.
          </p>
          <p>When a public ledger exists, this page will point at it. It will not estimate one.</p>
        </div>
        <p className="narrative-follow">
          <Link href="/#record" className="text-link">
            Back to the mountain
          </Link>
        </p>
      </div>
    </article>
  );
}
