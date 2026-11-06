import Link from "next/link";
import { Arrow } from "@/components/arrow";

export default function NotFound() {
  return (
    <div className="missing">
      <p className="camp-tag">
        <span>404</span>Off route
      </p>
      <h1 className="display page-title">This page is not part of Summit.</h1>
      <p className="page-lead">The address does not match a page on this site.</p>
      <p className="section-follow">
        <Link href="/" className="text-link">
          Back to the start
          <Arrow direction="right" />
        </Link>
      </p>
    </div>
  );
}
