import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Notes",
  description: "What SUMMIT is, what is public, and what has not been published.",
  alternates: { canonical: "/ascent" },
};

export default function AscentPage() {
  return (
    <>
      <div className="page-band">
        <Image
          src="/summit/hero.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[68%_36%]"
        />
      </div>
      <article className="page-shell">
        <div className="page-narrow">
          <p className="eyebrow">Notes</p>
          <h1 className="display page-title">What the project is.</h1>
          <div className="page-prose">
            <p>{brand.line}</p>
            <p>
              The mountain is the public face of that work. It is not a product diagram, and it is
              not a stand-in for a token, a contract, or a treasury.
            </p>
            <p>
              Those things will be named here if they are published. They are not published now.
              Ascend remains a separate project. This site does not speak for it.
            </p>
          </div>
          <p className="narrative-follow">
            <Link href="/#overview" className="text-link">
              Back to the start
            </Link>
          </p>
        </div>
      </article>
    </>
  );
}
