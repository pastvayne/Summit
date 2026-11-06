import type { Metadata } from "next";
import Link from "next/link";
import { recordFields } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Status",
  description: "A clear record of SUMMIT’s published status.",
  alternates: { canonical: "/record" },
};

export default function RecordPage() {
  return (
    <article className="page-shell">
      <div className="page-narrow">
        <p className="eyebrow">Status</p>
        <h1 className="display page-title">A clear record of the project’s progress.</h1>
        <p className="page-lead mt-6">Only what can be stated is listed. Empty fields stay empty.</p>
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
            SUMMIT is inspired by the Ascend ecosystem and remains independent. No official
            affiliation has been verified.
          </p>
          <p>If a public ledger is opened, this page will link to it. It will not estimate one.</p>
        </div>
        <p className="narrative-follow">
          <Link href="/#record" className="text-link">
            Back to the status
          </Link>
        </p>
      </div>
    </article>
  );
}
