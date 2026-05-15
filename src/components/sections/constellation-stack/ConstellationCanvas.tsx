"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useReducedMotion } from "framer-motion";
import { Suspense } from "react";
import { ConstellationScene } from "./ConstellationScene";

type Props = {
  /** Force pause render (when section not in view) */
  paused?: boolean;
};

export function ConstellationCanvas({ paused = false }: Props) {
  const prefersReduced = useReducedMotion();

  return (
    <Canvas
      className="constellation-canvas"
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 18], fov: 45, near: 0.1, far: 200 }}
      shadows
      gl-toneMappingExposure={1.2}
      frameloop={paused ? "never" : "always"}
      aria-hidden
    >
      <color attach="background" args={["#0a0f1c"]} />
      <fog attach="fog" args={["#0a0f1c", 14, 42]} />

      {/* Environment HDR · essencial pra MeshTransmissionMaterial + iridescence */}
      <Suspense fallback={null}>
        <Environment preset="city" background={false} environmentIntensity={0.5} />
      </Suspense>

      {/* Lighting · studio (key spotLight + 2 rim lights coloridas) */}
      <ambientLight intensity={0.2} />
      <spotLight
        position={[10, 20, 10]}
        intensity={100}
        angle={Math.PI / 6}
        penumbra={0.5}
        castShadow
        shadow-bias={-0.0001}
      />
      <pointLight position={[-10, 5, -5]} intensity={50} color="#06b6d4" distance={50} />
      <pointLight position={[10, -5, -5]} intensity={50} color="#8b5cf6" distance={50} />

      <Suspense fallback={null}>
        <ConstellationScene reducedMotion={!!prefersReduced} />
      </Suspense>

      {/* Mouse interaction · drag rotate + auto-rotate quando idle */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        enableZoom={false}
        minDistance={12}
        maxDistance={26}
        autoRotate={!prefersReduced}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(Math.PI / 3) * 2}
      />

      {/* Postprocessing · bloom estilo referência (0.8 strength · 0.7 threshold) */}
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={0.8}
          luminanceThreshold={0.7}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.5}
        />
      </EffectComposer>
    </Canvas>
  );
}
