"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { SpheresScene } from "./SpheresScene";

type Props = { paused?: boolean };

export function SpheresCanvas({ paused = false }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <Canvas
      className="spheres-canvas"
      // alpha:true · NO background · the page bg (dark / off-white) shows through
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 25], fov: 50, near: 0.1, far: 200 }}
      frameloop={paused ? "never" : "always"}
      shadows
      aria-hidden
    >
      {/* Environment map · reflections that make the spheres look glossy /
         very 3D (like the reference). background={false} = canvas stays
         transparent (page bg shows through). */}
      <Suspense fallback={null}>
        <Environment preset="studio" background={false} environmentIntensity={1.15} />
      </Suspense>

      {/* No white scene.background (transparent) → compensate with strong
         lighting so the white / light-indigo spheres read on the page bg */}
      <ambientLight intensity={1.15} color="#ffffff" />
      <hemisphereLight intensity={0.9} color="#ffffff" groundColor="#818cf8" />
      <directionalLight position={[0, 8, 14]} intensity={1.4} color="#ffffff" />
      <spotLight
        position={[0, 24, 40]}
        intensity={420}
        angle={Math.PI / 5}
        penumbra={0.4}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <spotLight
        position={[-18, -20, 30]}
        intensity={300}
        angle={Math.PI / 5}
        penumbra={0.5}
        color="#a5b4fc"
      />

      <Suspense fallback={null}>
        <SpheresScene reducedMotion={!!prefersReduced} />
      </Suspense>

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        enableZoom={false}
      />
    </Canvas>
  );
}
