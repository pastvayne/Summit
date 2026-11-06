import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { PageHeader } from "@/components/page-header";
import { brand, status } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: "What SUMMIT is, and how it relates to Ascend.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="page">
      <PageHeader
        eyebrow={
          <>
            <span>About</span>Summit
          </>
        }
        title="An independent project in the Ascend ecosystem."
        focus="72% 26%"
      />
      <div className="page-body">
        <div className="prose page-prose">
          <p>
            SUMMIT is designed to turn trading fees into SUMMIT buybacks and KNTQ distributions for
            eligible holders. The mountain is the public face of that idea.
          </p>
          <p>
            Ascend is the ecosystem this project sits in. SUMMIT does not speak for Ascend, and no
            official affiliation has been verified.
          </p>
          <p>
            The contract, the fee split, eligibility, and the public record are not published. This
            site will add them when they can be checked, not before.
          </p>
          <p className="section-follow">
            <Link href="/ascent" className="text-link">
              Read the mechanism
              <Arrow direction="right" />
            </Link>
          </p>
        </div>
        <aside className="page-aside">
          <p className="aside-head">At a glance</p>
          <dl className="facts">
            <div>
              <dt>Ecosystem</dt>
              <dd>{brand.universe}</dd>
            </div>
            <div>
              <dt>Token</dt>
              <dd>{brand.name}</dd>
            </div>
            <div>
              <dt>Distribution</dt>
              <dd>KNTQ</dd>
            </div>
            {status.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd className={item.value === "Pending" || item.value.startsWith("Not") ? "is-pending" : undefined}>
                  {item.value}
                </dd>
              </div>
            ))}
            <div>
              <dt>Official account</dt>
              <dd>
                <a className="inline-link" href={brand.x} target="_blank" rel="noreferrer">
                  {brand.xHandle}
                </a>
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </article>
  );
}
