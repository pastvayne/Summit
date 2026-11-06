"use client";

import { useEffect, useRef, useState } from "react";
import { camps } from "@/lib/brand";

/**
 * The travelling companion: an altimeter rail that climbs from base camp (the hero)
 * to the summit (the close) as the page scrolls. Each camp is a jump link.
 * Desktop shows the rail; small screens get a hairline progress bar instead.
 */
export function Altimeter() {
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;
    let anchors: number[] = [];
    let footerTop = Infinity;

    // anchors[i] = scroll position at which camp i is "reached" (its top passes 35% of the viewport)
    const measure = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      anchors = camps.map((camp, index) => {
        if (index === 0) return 0;
        const el = document.getElementById(camp.id);
        if (!el) return max;
        const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
        return Math.min(max, Math.max(0, top));
      });
      const footer = document.querySelector(".site-footer");
      footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : Infinity;
    };

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const last = anchors.length - 1;
      let index = 0;
      while (index < last && y >= anchors[index + 1] - 1) index += 1;
      let progress = 1;
      if (index < last) {
        const span = Math.max(1, anchors[index + 1] - anchors[index]);
        const t = Math.min(1, Math.max(0, (y - anchors[index]) / span));
        progress = (index + t) / last;
      }
      railRef.current?.style.setProperty("--alt", progress.toFixed(4));
      barRef.current?.style.setProperty("--alt", progress.toFixed(4));
      if (readoutRef.current) readoutRef.current.textContent = `${Math.round(progress * 100)}%`;
      setActive(index);
      const footerInView = y + window.innerHeight * 0.78 > footerTop;
      setShown(y > window.innerHeight * 0.18 && !footerInView);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    measure();
    update();
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <nav className={`altimeter${shown ? " is-shown" : ""}`} aria-label="Ascent progress">
        <div ref={railRef} className="alt-rail">
          <span className="alt-fill" aria-hidden="true" />
          <span className="alt-marker" aria-hidden="true">
            <span ref={readoutRef} className="alt-readout">
              0%
            </span>
          </span>
          <ol>
            {camps.map((camp, index) => (
              <li
                key={camp.id}
                style={{ bottom: `${(index / (camps.length - 1)) * 100}%` }}
                className={index === active ? "is-active" : index < active ? "is-passed" : undefined}
              >
                <a href={`#${camp.id}`} aria-current={index === active ? "location" : undefined}>
                  <span className="alt-code">{camp.short}</span>
                  <span className="alt-name">{camp.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>
      <div ref={barRef} className="alt-bar" aria-hidden="true" />
    </>
  );
}
