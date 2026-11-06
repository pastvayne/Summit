"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
        <Link href="/#overview" className="brand-lockup control" onClick={() => setOpen(false)}>
          <Mark className="h-6 w-6" />
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
          <a className="nav-link control" href={brand.x} target="_blank" rel="noreferrer">
            X
          </a>
        </nav>
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
      <nav id="mobile-nav" aria-label="Mobile" className={`menu-panel ${open ? "is-open" : ""}`}>
        <ul>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="control" onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a className="control" href={brand.x} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              X
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function MenuGlyph({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-5" aria-hidden="true">
      <path
        d={open ? "M5 5 L19 19 M19 5 L5 19" : "M3 8 H21 M3 16 H21"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
