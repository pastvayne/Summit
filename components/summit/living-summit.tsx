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
        <div className="hero-atmosphere" aria-hidden="true" />
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
              Ascend ecosystem
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
            <div className="hero-actions rise" style={{ animationDelay: "420ms" }}>
              <a className="hero-action" href="#engine">
                Explore the mechanism
              </a>
              <a className="hero-action" href={brand.x} target="_blank" rel="noreferrer">
                Follow Summit
              </a>
            </div>
            <dl className="hero-facts rise" style={{ animationDelay: "500ms" }}>
              <div>
                <dt>Ecosystem</dt>
                <dd>Ascend</dd>
              </div>
              <div>
                <dt>Token</dt>
                <dd>Summit</dd>
              </div>
              <div>
                <dt>Distribution</dt>
                <dd>KNTQ</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Planned</dd>
              </div>
            </dl>
            <a className="hero-fork rise" href="#engine" style={{ animationDelay: "560ms" }}>
              <span className="hero-fork-root">Trading fees</span>
              <span className="hero-fork-arms">
                <span>SUMMIT buybacks</span>
                <span>KNTQ distributions</span>
              </span>
            </a>
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
