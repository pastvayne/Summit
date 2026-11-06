import Link from "next/link";

export default function NotFound() {
  return (
    <div className="missing">
      <p className="eyebrow">Off the path</p>
      <h1 className="display page-title mt-4 max-w-xl">This ridge is empty.</h1>
      <p className="mt-5 max-w-md text-mist">The address does not lead anywhere on Summit.</p>
      <p className="narrative-follow">
        <Link href="/" className="text-link">
          Return to the mountain
        </Link>
      </p>
    </div>
  );
}
