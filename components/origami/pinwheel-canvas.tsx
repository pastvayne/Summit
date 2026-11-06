"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect } from "react";
import * as THREE from "three";
import { SpinningPinwheel } from "@/components/origami/spinning-pinwheel";

export default function PinwheelCanvas({ onReady }: { onReady?: () => void }) {
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.6]}
      camera={{ position: [0.2, 0.28, 4.7], fov: 28 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.setClearColor(0x000000, 0);
      }}
    >
      <hemisphereLight args={["#fff9f1", "#e7d7bf", 0.9]} />
      <ambientLight intensity={0.55} color="#fff8f0" />
      <directionalLight
        position={[2.6, 4.2, 5.2]}
        intensity={1.35}
        color="#fffaf4"
      />
      <directionalLight position={[-3.2, 1.4, 2.2]} intensity={0.4} color="#f3e6d0" />
      <directionalLight position={[0.4, -1.5, -3.2]} intensity={0.22} color="#fff" />
      <SpinningPinwheel />
    </Canvas>
  );
}
