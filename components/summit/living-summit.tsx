"use client";

import { useEffect, useRef } from "react";
import { brand, status } from "@/lib/brand";
import { Arrow } from "@/components/arrow";
import { mountSummit } from "@/components/summit/summit-scene";

export function LivingSummit() {
  const trackRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const track = trackRef.current;
    const copy = copyRef.current;
    if (!canvas || !image || !track || !copy) return;
    return mountSummit({ canvas, image, track, copy, cue: cueRef.current });
  }, []);

  return (
    <section id="overview" ref={trackRef} className="hero-track section-anchor" aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-atmosphere" aria-hidden="true" />
        <picture className="plate">
          <source
            media="(max-width: 767px)"
            type="image/webp"
            srcSet="/summit/peak-tall-900.webp 900w, /summit/peak-tall-1440.webp 1440w"
            sizes="(max-aspect-ratio: 9/16) 56.25vh, 100vw"
          />
          <source
            type="image/webp"
            srcSet="/summit/peak-wide-960.webp 960w, /summit/peak-wide-1600.webp 1600w, /summit/peak-wide-2560.webp 2560w"
            sizes="(min-aspect-ratio: 16/9) 100vw, 177.8vh"
          />
          <img
            ref={imageRef}
            src="/summit/peak-wide-1600.jpg"
            alt="A lone mountain rising out of a sea of night clouds, its summit lit violet."
            width={2560}
            height={1440}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-ground" aria-hidden="true" />

        <div ref={copyRef} className="hero-frame">
          <div className="hero-copy">
            <p className="hero-kicker rise" style={{ animationDelay: "80ms" }}>
              <span>{brand.universe} ecosystem</span>
              <span aria-hidden="true">/</span>
              <span>Contract pending</span>
            </p>
            <h1 id="hero-title" className="summit-title rise" style={{ animationDelay: "160ms" }}>
              {brand.name}
            </h1>
            <p className="summit-tagline rise" style={{ animationDelay: "250ms" }}>
              {brand.tagline}
            </p>
            <p className="summit-line rise" style={{ animationDelay: "340ms" }}>
              {brand.line}
            </p>
            <div className="hero-actions rise" style={{ animationDelay: "420ms" }}>
              <a className="btn btn-solid" href="#engine">
                <span>
                  <span className="lg-only">Explore </span>the mechanism
                </span>
              </a>
              <a className="btn btn-line" href={brand.x} target="_blank" rel="noreferrer">
                Follow Summit
                <Arrow />
              </a>
            </div>
          </div>

          <div className="hero-strip rise" style={{ animationDelay: "560ms" }}>
            <a className="strip-route" href="#engine" aria-label="Intended fee route: trading fees split into SUMMIT buybacks and KNTQ distributions">
              <span className="strip-label">Intended route</span>
              <span className="route-mini" aria-hidden="true">
                <span className="route-root">Trading fees</span>
                <span className="route-fork" />
                <span className="route-arms">
                  <span>SUMMIT buybacks</span>
                  <span>KNTQ distributions</span>
                </span>
              </span>
            </a>
            <dl className="strip-status">
              {status.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
            <div ref={cueRef} className="hero-cue" aria-hidden="true">
              <span className="cue-line" />
              <span>Scroll to climb</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
