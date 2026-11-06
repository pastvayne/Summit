import Link from "next/link";
import { Arrow } from "@/components/arrow";
import { Mark } from "@/components/mark";
import { brand, navItems } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="brand-lockup">
            <Mark className="brand-mark brand-mark-lg" />
            <span>Summit</span>
          </div>
          <p className="footer-tagline">{brand.tagline}</p>
        </div>
        <nav className="footer-col" aria-label="Site">
          <p className="footer-head">Site</p>
          <ul>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-col">
          <p className="footer-head">Elsewhere</p>
          <ul>
            <li>
              <a href={brand.x} target="_blank" rel="noreferrer">
                Summit {brand.xHandle}
                <Arrow />
              </a>
            </li>
            <li>
              <a href={brand.ascend} target="_blank" rel="noreferrer">
                Ascend {brand.ascendHandle}
                <Arrow />
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-col footer-notice">
          <p className="footer-head">Notice</p>
          <p>
            SUMMIT is independent. Ascend is the ecosystem it belongs to, not a partnership this site can
            claim. No official affiliation has been verified.
          </p>
          <p>Nothing on this site is financial advice, a yield, or a promise of price.</p>
        </div>
      </div>
      <div className="footer-base">
        <p>© 2026 Summit</p>
        <p>Contract pending · Record empty until activity can be checked</p>
        <p>
          Photo:{" "}
          <a href="https://unsplash.com/photos/SumjjLhysZM" target="_blank" rel="noreferrer">
            Marek Piwnicki / Unsplash
          </a>
        </p>
      </div>
    </footer>
  );
}
