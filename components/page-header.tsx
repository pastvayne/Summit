import type { ReactNode } from "react";

/**
 * Sub-page opener. The band shows the plate at (or below) its native scale, so it stays sharp:
 * a 2560px plate cropped to a short band never has to be magnified.
 */
export function PageHeader({
  eyebrow,
  title,
  lead,
  focus = "70% 30%",
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  focus?: string;
}) {
  return (
    <header className="page-header">
      <div className="page-band" aria-hidden="true">
        <picture>
          <source
            type="image/webp"
            srcSet="/summit/peak-wide-1600.webp 1600w, /summit/peak-wide-2560.webp 2560w"
            sizes="100vw"
          />
          <img
            src="/summit/peak-wide-1600.jpg"
            alt=""
            width={2560}
            height={1440}
            decoding="async"
            fetchPriority="high"
            style={{ objectPosition: focus }}
          />
        </picture>
      </div>
      <div className="page-header-copy">
        <p className="camp-tag">{eyebrow}</p>
        <h1 className="display page-title">{title}</h1>
        {lead ? <p className="page-lead">{lead}</p> : null}
      </div>
    </header>
  );
}
