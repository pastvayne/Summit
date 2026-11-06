"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Arrow } from "@/components/arrow";
import { Mark } from "@/components/mark";
import { brand, navItems } from "@/lib/brand";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-solid" : ""}`}>
      <div className="site-header-bar">
        <Link href="/" className="brand-lockup control" onClick={() => setOpen(false)} aria-label="Summit home">
          <Mark className="brand-mark" />
          <span>Summit</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary">
          {navItems.map((item) => {
            const current = item.href === pathname;
            return (
              <Link key={item.href} href={item.href} aria-current={current ? "page" : undefined} className="nav-link control">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="header-end">
          <a className="btn btn-line btn-small header-x" href={brand.x} target="_blank" rel="noreferrer">
            Follow on X
            <Arrow />
          </a>
          <button
            type="button"
            className="menu-button control"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <MenuGlyph open={open} />
          </button>
        </div>
      </div>
      <nav id="mobile-nav" aria-label="Mobile" className={`menu-panel ${open ? "is-open" : ""}`} inert={!open}>
        <ol>
          {navItems.map((item, index) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="control"
                aria-current={item.href === pathname ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ol>
        <div className="menu-foot">
          <a className="btn btn-solid" href={brand.x} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            Follow Summit on X
            <Arrow />
          </a>
          <p>Independent project in the Ascend ecosystem. Contract pending.</p>
        </div>
      </nav>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d={open ? "M5 5 L19 19 M19 5 L5 19" : "M3 8 H21 M3 16 H21"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
