import Link from "next/link";

export default function NotFound() {
  return (
    <div className="missing">
      <p className="eyebrow">404</p>
      <h1 className="display page-title mt-4 max-w-xl">This page is not part of Summit.</h1>
      <p className="mt-5 max-w-md text-mist">The address does not match a page on this site.</p>
      <p className="narrative-follow">
        <Link href="/" className="text-link">
          Back to the start
        </Link>
      </p>
    </div>
  );
}
