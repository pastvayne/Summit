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
            Summit is an independent project in the visual weather of Ascend. No official affiliation
            has been verified. Nothing here is an offer, a yield, or financial advice.
          </p>
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
                Ascend on X
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
