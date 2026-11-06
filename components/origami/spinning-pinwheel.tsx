"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createBladePanels, createPaperTexture } from "@/components/origami/geometry";

function Blades() {
  const panels = useMemo(() => createBladePanels(), []);
  const texture = useMemo(() => createPaperTexture(), []);

  return (
    <group scale={0.7}>
      {Array.from({ length: 4 }, (_, index) => (
        <group key={index} rotation={[0, 0, (index * Math.PI) / 2]} position={[0, 0, index * 0.01]}>
          {[panels.left, panels.right].map((geometry, side) => (
            <mesh key={side} geometry={geometry}>
              <meshPhysicalMaterial
                vertexColors
                map={texture ?? undefined}
                color="#fffaf4"
                roughness={0.86}
                metalness={0}
                clearcoat={0.03}
                clearcoatRoughness={0.8}
                sheen={0.22}
                sheenColor="#fffaf3"
                sheenRoughness={0.7}
              />
            </mesh>
          ))}
        </group>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.04]}>
        <cylinderGeometry args={[0.09, 0.09, 0.02, 32]} />
        <meshStandardMaterial color="#f6f1e7" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.055]}>
        <cylinderGeometry args={[0.038, 0.038, 0.028, 24]} />
        <meshStandardMaterial color="#2a2723" roughness={0.5} />
      </mesh>
    </group>
  );
}

export function SpinningPinwheel() {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.z -= delta * ((Math.PI * 2) / 14);
  });

  return (
    <group rotation={[0.58, -0.32, 0.06]} position={[0, -0.02, 0]}>
      <group ref={group}>
        <Blades />
      </group>
    </group>
  );
}
