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
      // alpha:true · NO scene background · canvas transparente (fundo da page)
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 25], fov: 50, near: 0.1, far: 200 }}
      frameloop={paused ? "never" : "always"}
      shadows
      aria-hidden
    >
      {/* Environment (background:false → canvas SEGUE transparente) dá os
         reflexos realistas; sem bloom/composer = transparência limpa.
         Luz ambiente baixa (não lavar) + 1 key com sombra suave entre
         esferas (3D do original) + rim indigo sutil. */}
      <Suspense fallback={null}>
        <Environment preset="city" background={false} environmentIntensity={1.0} />
      </Suspense>

      <ambientLight intensity={0.35} color="#ffffff" />
      <spotLight
        position={[6, 18, 30]}
        angle={Math.PI / 6}
        penumbra={0.35}
        intensity={520}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />
      <pointLight position={[-14, -8, 18]} intensity={120} color="#a5b4fc" />

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
