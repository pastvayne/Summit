"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StaticPinwheel } from "@/components/origami/static-pinwheel";

const PinwheelCanvas = dynamic(() => import("@/components/origami/pinwheel-canvas"), {
  ssr: false,
});

export function PinwheelStage() {
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let context: RenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      context = canvas.getContext("webgl2") || canvas.getContext("webgl");
    } catch {
      context = null;
    }
    setLive(!reduced && Boolean(context));
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div
        className={`absolute inset-[18%] top-[62%] -z-10 rounded-full bg-[#2a2520]/10 blur-2xl ${ready ? "opacity-100" : "opacity-70"}`}
        aria-hidden="true"
      />
      <div className={ready ? "invisible" : "block h-full w-full"}>
        <StaticPinwheel animate={!live} className="h-full w-full" />
      </div>
      {live ? (
        <div className={`absolute inset-0 transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}>
          <PinwheelCanvas onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
