"use client";

import { useEffect, useRef } from "react";
import { brand } from "@/lib/brand";
import { mountSummit } from "@/components/summit/summit-scene";

export function LivingSummit() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    const cue = cueRef.current;
    if (!canvas || !track || !copy) return;
    return mountSummit({ canvas, track, copy, cue });
  }, []);

  return (
    <section id="overview" ref={trackRef} className="hero-track section-anchor relative">
      <div className="hero-stage sticky top-0 h-[100svh] overflow-hidden">
        <picture className="plate">
          <source media="(max-width: 767px)" srcSet="/summit/hero-mobile.jpg" />
          <img
            src="/summit/hero.jpg"
            alt="A lone mountain rising out of a sea of night clouds, its summit lit violet."
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-ground" />

        <div className="hero-copy-wrap">
          <div ref={copyRef} className="hero-copy">
            <p className="eyebrow rise" style={{ animationDelay: "80ms" }}>
              The living summit
            </p>
            <h1 className="summit-title rise" style={{ animationDelay: "160ms" }}>
              {brand.name}
            </h1>
            <p className="summit-tagline rise" style={{ animationDelay: "250ms" }}>
              {brand.tagline}
            </p>
            <p className="summit-line rise" style={{ animationDelay: "340ms" }}>
              {brand.line}
            </p>
          </div>
        </div>

        <div className="hero-cue-wrap">
          <div ref={cueRef} className="hero-cue">
            <span className="cue-line" />
            <span className="cue-label">Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
