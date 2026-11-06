import Link from "next/link";
import { Mark } from "@/components/mark";
import { brand, navItems } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="brand-lockup">
            <Mark className="h-6 w-6" />
            <span>Summit</span>
          </div>
          <p className="footer-tagline">{brand.tagline}</p>
          <p className="footer-note">
            SUMMIT is an independent project inspired by the Ascend ecosystem. No official
            affiliation has been verified. Nothing on this site is an offer or financial advice.
          </p>
          <p className="footer-copy">© 2026 Summit</p>
        </div>
        <div>
          <p className="eyebrow">Index</p>
          <ul className="footer-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href={brand.ascend} target="_blank" rel="noreferrer">
                X
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
