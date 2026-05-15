"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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
      {/* Recipe fiel ao soju22 original (MeshPhong + ambient cinza + 2
         spotlights com shadow). Sem env map, sem bloom → 3D realista com
         sombras suaves entre as esferas. O hemisphere substitui o bounce
         do scene.background branco do original (mantemos transparente). */}
      <ambientLight intensity={2.1} color="#808080" />
      <hemisphereLight intensity={1.7} color="#ffffff" groundColor="#cbd5ff" />
      <spotLight
        position={[0, 20, 50]}
        angle={Math.PI / 8}
        penumbra={0.1}
        intensity={650}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
      />
      <spotLight
        position={[0, -20, 50]}
        angle={Math.PI / 8}
        penumbra={0.1}
        intensity={360}
        color="#a5b4fc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0005}
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
