import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-5">
      <p className="font-mono text-[11px] tracking-[0.22em] text-brass uppercase">404</p>
      <h1 className="mt-4 font-serif text-5xl text-paper">This page is not on the floor.</h1>
      <p className="mt-4 max-w-xl text-muted">
        The address does not match a PaperMill page. The treasury record and the strategy memo are
        still where they were.
      </p>
      <Link href="/" className="btn btn-solid mt-8 w-fit">
        Back to overview
      </Link>
    </div>
  );
}
