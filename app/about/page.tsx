import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "What SUMMIT is, and how it relates to Ascend.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="page-shell">
      <div className="page-narrow">
        <p className="eyebrow">About</p>
        <h1 className="display page-title">An independent project in the Ascend ecosystem.</h1>
        <div className="page-prose">
          <p>
            SUMMIT is designed to turn trading fees into SUMMIT buybacks and HYPE distributions for
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
        </div>
        <p className="narrative-follow">
          <Link href="/#engine" className="text-link">
            Read the mechanism
          </Link>
        </p>
      </div>
    </article>
  );
}
