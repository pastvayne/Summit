"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Mark } from "@/components/mark";
import { navItems } from "@/lib/protocol";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-line bg-ink/92 backdrop-blur-md" : "border-transparent bg-ink/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/#overview" className="flex items-center gap-2.5 text-paper" onClick={() => setOpen(false)}>
          <Mark className="h-7 w-7 text-brass" />
          <span className="text-sm font-semibold tracking-[-0.04em]">papermill</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          <a
            href="https://x.com/buypapermill"
            target="_blank"
            rel="noreferrer"
            aria-label="PaperMill on X"
            className="text-paper-dim transition-colors hover:text-paper"
          >
            <XMark />
          </a>
          {navItems.map((item) => {
            const current = item.href === "/treasury" && pathname === "/treasury";
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`text-sm transition-colors hover:text-paper ${
                  current ? "text-brass" : "text-paper-dim"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center border border-line text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X aria-hidden="true" size={18} /> : <Menu aria-hidden="true" size={18} />}
        </button>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="max-h-[calc(100dvh-4rem)] overflow-auto border-t border-line bg-ink px-5 py-6 md:hidden"
        >
          <ul className="space-y-1">
            <li>
              <a
                href="https://x.com/buypapermill"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 py-3 font-serif text-4xl text-paper"
                onClick={() => setOpen(false)}
              >
                <XMark />
                X
              </a>
            </li>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block py-3 font-serif text-4xl text-paper"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}

function XMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}
