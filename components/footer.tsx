import { Mark } from "@/components/mark";
import { brand } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="brand-lockup">
        <Mark className="h-7 w-7" />
        <span>Summit</span>
      </div>
      <p className="footer-tagline">{brand.tagline}</p>
      <p className="footer-note">
        SUMMIT is independent. Ascend is the ecosystem it belongs to, not a partnership this site can
        claim. No official affiliation has been verified.
      </p>
      <p className="narrative-follow">
        <a className="text-link" href={brand.x} target="_blank" rel="noreferrer">
          Follow Summit
        </a>
      </p>
      <p className="footer-copy">© 2026 Summit</p>
    </footer>
  );
}
